import type { PerlinaBotGroup, PerlinaBotUser } from '../basic/base'
import type { Equal, Expect } from '../utils'
import type { PerlinaBotBaseEvent } from './base'

export type PerlinaBotRequestType = 'Group-Request' | 'Friend-Add' | 'Custom'
export interface PerlinaBotBaseRequestEvent<
    RequestType extends PerlinaBotRequestType = PerlinaBotRequestType,
> extends PerlinaBotBaseEvent<'Request'> {
    request_type: RequestType
    sub_type?: string
}
export interface PerlinaBotGroupRequestEvent extends PerlinaBotBaseRequestEvent<'Group-Request'> {
    sub_type: 'Invite' | 'Join'
    group: PerlinaBotGroup
    /**
     * In Join Request: The User Who Send Request
     * In Invite Request: The User Who Is Invited
     */
    user: PerlinaBotUser
    /**
     * In Join Request: Undefined
     * In Invite Request: The User Who Do Invited
     */
    operator?: PerlinaBotUser
    request_id: string
    reason?: string
}
export interface PerlinaBotFriendAddRequestEvent extends PerlinaBotBaseRequestEvent<'Friend-Add'> {
    user: PerlinaBotUser
    request_id: string
    reason?: string
}
export interface PerlinaBotCustomRequestEvent<
    SubType extends string = string,
    DataType extends Record<string, unknown> = Record<string, unknown>,
> extends PerlinaBotBaseRequestEvent<'Custom'> {
    sub_type: SubType
    data?: DataType
}
export interface PerlinaBotRequestEventMap {
    'Group-Request': PerlinaBotGroupRequestEvent
    'Friend-Add': PerlinaBotFriendAddRequestEvent
    Custom: PerlinaBotCustomRequestEvent
}
export type PerlinaBotRequestEvent =
    PerlinaBotRequestEventMap[PerlinaBotRequestType]
export type PerlinaBotRequestEventOf<
    RequestType extends PerlinaBotRequestType = PerlinaBotRequestType,
> = PerlinaBotRequestEventMap[RequestType]
export type _RequestEventTypeComplete = Expect<
    Equal<keyof PerlinaBotRequestEventMap, PerlinaBotRequestType>
>
