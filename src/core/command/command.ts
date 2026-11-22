import type { PerlinaBotCommandBuilder } from './builder'
import type { PerlinaBotEventHandler } from './types'

export interface PerlinaBotCommand {
    subcommand(name: string): PerlinaBotCommandBuilder
    handler(handler: PerlinaBotEventHandler): void
}
