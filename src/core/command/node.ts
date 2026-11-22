import type { PerlinaBotEventHandler } from './types'

export interface PerlinaBotCommandNode {
    name: string
    handler?: PerlinaBotEventHandler
    subcommands: PerlinaBotCommandNode[]
}
