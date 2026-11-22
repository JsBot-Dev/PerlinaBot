import type { PerlinaBotCommandNode } from '@core/command'
import {
    PerlinaBotCommandTreeBuilder,
    type PerlinaBotCommandBuilder,
} from '@core/command/builder'
import type { PerlinaBotEvent } from '@core/types'
import type { PerlinaBotAdapter } from './types'

export interface PerlinaBotPluginContext {
    command(name: string): PerlinaBotCommandBuilder
    adapter(handler: PerlinaBotAdapter): void
}
export class PerlinaBotPluginContext implements PerlinaBotPluginContext {
    readonly #tree: PerlinaBotCommandTreeBuilder
    readonly #adapters: PerlinaBotAdapter[]
    constructor(tree: PerlinaBotCommandTreeBuilder, adapters: PerlinaBotAdapter[]) {
        this.#tree = tree
        this.#adapters = adapters
    }
    command(name: string): PerlinaBotCommandBuilder {
        return this.#tree.command(name)
    }
    adapter(handler: PerlinaBotAdapter): void {
        this.#adapters.push(handler)
    }
    get commands(): readonly PerlinaBotCommandNode[] {
        return this.#tree.commands
    }
}
