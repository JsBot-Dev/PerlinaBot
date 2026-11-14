import type { Equal, Expect } from '../utils'
import type { PerlinaBotBaseEvent } from './base'

export type PerlinaBotMetaType = 'Lifecycle' | 'Heartbeat' | 'Status' | 'Custom'
export type PerlinaBotLifecycleType = 'Connect' | 'Enable' | 'Disable'
export type PerlinaBotStatusType = 'Online' | 'Offline'
export interface PerlinaBotBaseMetaEvent<
    MetaType extends PerlinaBotMetaType = PerlinaBotMetaType,
> extends PerlinaBotBaseEvent<'Meta'> {
    meta_type: MetaType
    sub_type?: string
}

export interface PerlinaBotLifecycleMetaEvent extends PerlinaBotBaseMetaEvent<'Lifecycle'> {
    sub_type: PerlinaBotLifecycleType
    reason?: string
}

export interface PerlinaBotStatus {
    online: boolean
    good: boolean
    latency?: number
}

export interface PerlinaBotHeartbeatMetaEvent extends PerlinaBotBaseMetaEvent<'Heartbeat'> {
    status: PerlinaBotStatus
    interval: number
}

export interface PerlinaBotStatusMetaEvent extends PerlinaBotBaseMetaEvent<'Status'> {
    status: PerlinaBotStatusType
    reason?: string
}

export interface PerlinaBotCustomMetaEvent<
    SubType extends string = string,
    DataType extends Record<string, unknown> = Record<string, unknown>,
> extends PerlinaBotBaseMetaEvent<'Custom'> {
    sub_type: SubType
    data?: DataType
}
export interface PerlinaBotMetaEventMap {
    Lifecycle: PerlinaBotLifecycleMetaEvent
    Heartbeat: PerlinaBotHeartbeatMetaEvent
    Status: PerlinaBotStatusMetaEvent
    Custom: PerlinaBotCustomMetaEvent
}
export type PerlinaBotMetaEvent = PerlinaBotMetaEventMap[PerlinaBotMetaType]
export type PerlinaBotMetaEventOf<
    MetaType extends PerlinaBotMetaType = PerlinaBotMetaType,
> = PerlinaBotMetaEventMap[MetaType]
export type _MetaEventTypeComplete = Expect<
    Equal<keyof PerlinaBotMetaEventMap, PerlinaBotMetaType>
>
