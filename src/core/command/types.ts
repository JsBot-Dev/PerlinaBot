import type { PerlinaBotEventContext } from '@core/event/context'
import type { PerlinaBotEvent } from '@core/types'

export type PerlinaBotEventHandler = (
    event: PerlinaBotEvent,
    context: PerlinaBotEventContext
) => void | Promise<void>
