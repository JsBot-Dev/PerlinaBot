import type { PerlinaBotMessage } from '../message'
import type { PerlinaBotGroup, PerlinaBotUser } from '../basic/base'
import type { PerlinaBotBaseEvent } from './base'

export type PerlinaBotMessageType = 'Group' | 'Private'
export type PerlinaBotMessageDirection = 'Incoming' | 'Outgoing'
export interface PerlinaBotBaseMessageEvent<
    MessageType extends PerlinaBotMessageType = PerlinaBotMessageType,
> extends PerlinaBotBaseEvent<'Message'> {
    sender: PerlinaBotUser
    message: PerlinaBotMessage
    message_type: MessageType
    message_id: string
    direction: PerlinaBotMessageDirection
}
export interface PerlinaBotGroupMessageEvent extends PerlinaBotBaseMessageEvent<'Group'> {
    group: PerlinaBotGroup
}
export interface PerlinaBotPrivateMessageEvent extends PerlinaBotBaseMessageEvent<'Private'> {}
export type PerlinaBotMessageEvent =
    PerlinaBotPrivateMessageEvent | PerlinaBotGroupMessageEvent
