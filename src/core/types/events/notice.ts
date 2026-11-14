import type {
    PerlinaBotGroup,
    PerlinaBotSession,
    PerlinaBotUser,
} from '../basic/base'
import type { Equal, Expect } from '../utils'
import type { PerlinaBotBaseEvent } from './base'

export type PerlinaBotGroupNoticeType =
    'Group-Member-Change' | 'Group-Admin-Change' | 'Group-Ban'
export type PerlinaBotMessageNoticeType = 'Message-Recall' | 'Message-Reaction'
export type PerlinaBotNoticeType =
    PerlinaBotGroupNoticeType | PerlinaBotMessageNoticeType | 'Custom'

export interface PerlinaBotBaseNoticeEvent<
    NoticeType extends PerlinaBotNoticeType = PerlinaBotNoticeType,
> extends PerlinaBotBaseEvent<'Notice'> {
    notice_type: NoticeType
    sub_type?: string
}
export interface PerlinaBotGroupNoticeEvent<
    GroupNoticeType extends PerlinaBotGroupNoticeType =
        PerlinaBotGroupNoticeType,
> extends PerlinaBotBaseNoticeEvent {
    notice_type: GroupNoticeType
}
export interface PerlinaBotMessageNoticeEvent<
    MessageNoticeType extends PerlinaBotMessageNoticeType =
        PerlinaBotMessageNoticeType,
> extends PerlinaBotBaseNoticeEvent {
    notice_type: MessageNoticeType
}
export interface PerlinaBotGroupMemberChangeEvent extends PerlinaBotGroupNoticeEvent<'Group-Member-Change'> {
    sub_type: 'Join' | 'Leave' | 'Invite' | 'Kick'
    group: PerlinaBotGroup
    user: PerlinaBotUser
    operator: PerlinaBotUser
}
export interface PerlinaBotGroupAdminChangeEvent extends PerlinaBotGroupNoticeEvent<'Group-Admin-Change'> {
    sub_type: 'Set' | 'Unset'
    group: PerlinaBotGroup
    user: PerlinaBotUser
    operator: PerlinaBotUser
}
export interface PerlinaBotGroupBanEvent extends PerlinaBotGroupNoticeEvent<'Group-Ban'> {
    sub_type: 'Ban' | 'Unban'
    group: PerlinaBotGroup
    user: PerlinaBotUser
    operator: PerlinaBotUser
    duration: number
}
export interface PerlinaBotMessageRecallEvent extends PerlinaBotMessageNoticeEvent<'Message-Recall'> {
    message_id: string
    session: PerlinaBotSession
    author?: PerlinaBotUser
    operator: PerlinaBotUser
}
export interface PerlinaBotMessageReactionEvent extends PerlinaBotMessageNoticeEvent<'Message-Reaction'> {
    message_id: string
    session: PerlinaBotSession
    reactor: PerlinaBotUser
    code: string
}
export interface PerlinaBotCustomNoticeEvent<
    SubType extends string = string,
    DataType extends Record<string, unknown> = Record<string, unknown>,
> extends PerlinaBotBaseNoticeEvent<'Custom'> {
    sub_type: SubType
    data?: DataType
}
export interface PerlinaBotNoticeEventMap {
    'Group-Member-Change': PerlinaBotGroupMemberChangeEvent
    'Group-Admin-Change': PerlinaBotGroupAdminChangeEvent
    'Group-Ban': PerlinaBotGroupBanEvent
    'Message-Recall': PerlinaBotMessageRecallEvent
    'Message-Reaction': PerlinaBotMessageReactionEvent
    Custom: PerlinaBotCustomNoticeEvent
}
export type PerlinaBotNoticeEvent =
    PerlinaBotNoticeEventMap[PerlinaBotNoticeType]
export type PerlinaBotNoticeEventOf<
    NoticeType extends PerlinaBotNoticeType = PerlinaBotNoticeType,
> = PerlinaBotNoticeEventMap[NoticeType]
export type _NoticeEventTypeComplete = Expect<
    Equal<keyof PerlinaBotNoticeEventMap, PerlinaBotNoticeType>
>
