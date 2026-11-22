import type { PerlinaBotEventContext } from '@core/event/context'
import { PerlinaBotEventProcessor } from '@core/event/processor'
import type { PerlinaBotEvent } from '@core/types'
import type { PerlinaBotAdapter, PerlinaBotLoadedPlugin } from './types'
import { PerlinaBotCommandTreeBuilder } from '@core/command/builder'
import { PerlinaBotPluginContext } from './context'

export class PerlinaBotPluginHost extends PerlinaBotEventProcessor {
    #plugins: PerlinaBotLoadedPlugin[]
    #handlers: Set<(event: PerlinaBotEvent) => void> = new Set
    readonly #tree = new PerlinaBotCommandTreeBuilder()
    readonly #adapters: PerlinaBotAdapter[] = []
    constructor(plugins: PerlinaBotLoadedPlugin[]) {
        super()
        this.#plugins = plugins
    }
    set plugins(plugins: PerlinaBotLoadedPlugin[]) {
        this.#plugins.push(...plugins)
    }
    async setup() {
        for (const item of this.#plugins) {
            const ctx = new PerlinaBotPluginContext(this.#tree, this.#adapters)
            await item.plugin(ctx)
        }
    } async start() {
        for (const setup of this.#adapters) {
            setup((event) => this.#emit(event))
        }
    }
    onEvent(handler: (event: PerlinaBotEvent) => void) {
        this.#handlers.add(handler)
        return (() => {
            this.#handlers.delete(handler)
        })
    }
    process(
        event: PerlinaBotEvent,
        context: PerlinaBotEventContext
    ): void | Promise<void> {
        console.log(event)
    }
    #emit(event: PerlinaBotEvent) {
        for (const handler of this.#handlers) {
            handler(event)
        }
    }
}
