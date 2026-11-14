import type { Equal, Expect } from '../utils'
import type { PerlinaBotEventType } from './base'
import type { PerlinaBotMessageEvent } from './message'
import type { PerlinaBotMetaEvent } from './meta'
import type { PerlinaBotNoticeEvent } from './notice'
import type { PerlinaBotRequestEvent } from './request'

export interface PerlinaBotEventMap {
    Message: PerlinaBotMessageEvent
    Meta: PerlinaBotMetaEvent
    Notice: PerlinaBotNoticeEvent
    Request: PerlinaBotRequestEvent
}
export type PerlinaBotEvent = PerlinaBotEventMap[PerlinaBotEventType]
export type PerlinaBotEventOf<EventType extends PerlinaBotEventType> =
    PerlinaBotEventMap[EventType]
export type _EventTypeComplete = Expect<
    Equal<keyof PerlinaBotEventMap, PerlinaBotEventType>
>
