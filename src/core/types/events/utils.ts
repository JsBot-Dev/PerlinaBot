import type { PerlinaBotEvent } from './events'
import type {
    PerlinaBotGroupMessageEvent,
    PerlinaBotMessageEvent,
    PerlinaBotPrivateMessageEvent,
} from './message'
import type { PerlinaBotMetaEvent } from './meta'
import type { PerlinaBotNoticeEvent } from './notice'
import type { PerlinaBotRequestEvent } from './request'

export function isMessageEvent(
    event: PerlinaBotEvent
): event is PerlinaBotMessageEvent {
    return event.event_type === 'Message'
}

export function isGroupMessageEvent(
    event: PerlinaBotEvent
): event is PerlinaBotGroupMessageEvent {
    return isMessageEvent(event) && event.message_type === 'Group'
}

export function isPrivateMessageEvent(
    event: PerlinaBotEvent
): event is PerlinaBotPrivateMessageEvent {
    return isMessageEvent(event) && event.message_type === 'Private'
}

export function isNoticeEvent(
    event: PerlinaBotEvent
): event is PerlinaBotNoticeEvent {
    return event.event_type === 'Notice'
}

export function isRequestEvent(
    event: PerlinaBotEvent
): event is PerlinaBotRequestEvent {
    return event.event_type === 'Request'
}

export function isMetaEvent(
    event: PerlinaBotEvent
): event is PerlinaBotMetaEvent {
    return event.event_type === 'Meta'
}
