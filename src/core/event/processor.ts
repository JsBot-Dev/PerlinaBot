import type { PerlinaBotEvent } from '@core/types'
import type { PerlinaBotEventContext } from './context'

export abstract class PerlinaBotEventProcessor {
    abstract onEvent(handler:(event:PerlinaBotEvent)=>void): void
    abstract process(
        event: PerlinaBotEvent,
        context: PerlinaBotEventContext
    ): void | Promise<void>
}
