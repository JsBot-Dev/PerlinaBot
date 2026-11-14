import type { PerlinaBotPlatform } from "../basic"

export type PerlinaBotEventType = 'Message' | 'Notice' | 'Request' | 'Meta'
export interface PerlinaBotBaseEvent<
    EventType extends PerlinaBotEventType = PerlinaBotEventType,
> {
    time: number
    self_id: string
    event_type: EventType
    platform: PerlinaBotPlatform
    raw?: unknown
}
