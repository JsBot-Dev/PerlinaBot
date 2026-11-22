import type { PerlinaBotCommand } from './command'
import type { PerlinaBotCommandNode } from './node'
import type { PerlinaBotEventHandler } from './types'

export class PerlinaBotCommandTreeBuilder {
    #root = new Map<string, PerlinaBotCommandNode>()
    command(name: string) {
        const node = this.#root.get(name)
        if (node) return new PerlinaBotCommandBuilder(node)

        const newNode = { name, subcommands: [] }
        this.#root.set(name, newNode)
        return new PerlinaBotCommandBuilder(newNode)
    }
    get commands(): readonly PerlinaBotCommandNode[] {
        return [...this.#root.values()]
    }
}
export class PerlinaBotCommandBuilder implements PerlinaBotCommand {
    node: PerlinaBotCommandNode
    constructor(node: PerlinaBotCommandNode) {
        this.node = node
    }
    subcommand(name: string): PerlinaBotCommandBuilder {
        let child = this.node.subcommands.find((node) => node.name === name)
        if (!child) {
            child = {
                name,
                subcommands: [],
            }
            this.node.subcommands.push(child)
        }

        return new PerlinaBotCommandBuilder(child)
    }
    handler(handler: PerlinaBotEventHandler): void {
        this.node.handler = handler
    }
}
