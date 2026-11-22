import type { PerlinaBotEvent } from '@core/types'

export class PerlinaBotEventContext {
    readonly event: PerlinaBotEvent
    readonly signal: AbortSignal
    #stopped: boolean
    constructor(event: PerlinaBotEvent, signal: AbortSignal) {
        this.event = event
        this.signal = signal
        this.#stopped = false
    }
    get stopped() {
        return this.#stopped
    }
    stopPropagation() {
        this.#stopped = true
    }
}
