import type { PerlinaBotEvent } from '@core/types'
import {
    PerlinaBotEventLineError,
    type PerlinaBotEventLineCounter,
    type PerlinaBotEventLineOptions,
    type PerlinaBotEventLineStatus,
} from './types'
import type { PerlinaBotEventProcessor } from './processor'
import { PerlinaBotEventContext } from './context'

export class PerlinaBotEventLine {
    #abort: AbortController = new AbortController()
    #queue: PerlinaBotEvent[] = []
    #wake: (() => void) | null = null
    #generation: number = 0
    #eventTimeoutMs: number = 5_000
    #processor: PerlinaBotEventProcessor
    #worker: Promise<void> | null = null
    #stopPromise: Promise<void> | null = null
    #state: PerlinaBotEventLineStatus = 'Idle'
    #counter: PerlinaBotEventLineCounter = {
        received: 0,
        processed: 0,
        processing: 0,
        failed: 0,
        cancelled: 0,
        dropped: 0,
    }
    get state() {
        return this.#state
    }
    get counter() {
        return { ...this.#counter }
    }
    constructor(options: PerlinaBotEventLineOptions) {
        this.#processor = options.processor
        this.#eventTimeoutMs = options.eventTimeoutMs ?? 5_000
    }
    start() {
        if (this.#state === 'Running') return

        if (this.#state === 'Stopping')
            throw new PerlinaBotEventLineError(`The eventline is stopping`)

        this.#state = 'Running'
        this.#generation++
        this.#abort = new AbortController()
        this.#queue = []
        this.#counter = {
            received: 0,
            processed: 0,
            processing: 0,
            failed: 0,
            cancelled: 0,
            dropped: 0,
        }
        this.#worker = this.#loop(this.#generation)
    }
    push(event: PerlinaBotEvent) {
        if (this.#state !== 'Running') {
            this.#counter.dropped++
            return false
        }

        this.#queue.push(event)
        this.#counter.received++
        this.#wake?.()
        return true
    }
    async #loop(generation: number) {
        while (true) {
            if (generation !== this.#generation) break

            const event = this.#queue.shift()
            if (event !== undefined) {
                await this.#solve(event)
                continue
            }

            if (this.#state !== 'Running') break

            await this.#wait()
            this.#wake = null
        }
    }
    async #solve(event: PerlinaBotEvent) {
        const counter = this.#counter
        const abort = this.#abort
        const controller = new AbortController()
        const onAbort = () => controller.abort(abort.signal.reason)
        abort.signal.addEventListener('abort', onAbort, { once: true })
        const timer = setTimeout(() => {
            controller.abort(new Error(`Event Time Out`))
        }, this.#eventTimeoutMs)
        const context = new PerlinaBotEventContext(event, controller.signal)
        counter.processing++
        try {
            await this.#processor.process(event, context)
            counter.processed++
        } catch {
            if (controller.signal.aborted && abort.signal.aborted)
                counter.cancelled++
            else counter.failed++
        } finally {
            clearTimeout(timer)
            counter.processing--
            abort.signal.removeEventListener('abort', onAbort)
        }
    }
    #wait() {
        return new Promise<void>((resolve) => {
            this.#wake = resolve
            if (this.#queue.length > 0 || this.#state !== 'Running') {
                this.#wake = null
                resolve()
            }
        })
    }
    async #stop() {
        if (this.#state === 'Idle' || this.#state === 'Stopped') {
            this.#state = 'Stopped'
            return
        }

        this.#state = 'Stopping'
        const discarded = this.#queue.length
        this.#queue.length = 0
        this.#counter.dropped += discarded
        this.#wake?.()
        this.#wake = null
        this.#abort.abort(new Error('EventLine Stopped'))
        const worker = this.#worker
        if (worker !== null) {
            let timer: ReturnType<typeof setTimeout> | null = null
            await Promise.race([
                worker.catch(() => {}),
                new Promise<void>(
                    (resolve) => (timer = setTimeout(resolve, 5_000))
                ),
            ])
            if (timer !== null) clearTimeout(timer)
        }

        this.#worker = null
        this.#state = 'Stopped'
    }
    stop() {
        if (this.#stopPromise !== null) return this.#stopPromise

        this.#stopPromise = this.#stop().finally(() => {
            this.#stopPromise = null
        })
        return this.#stopPromise
    }
}
