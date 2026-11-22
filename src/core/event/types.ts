import type { PerlinaBotEventProcessor } from './processor'

export type PerlinaBotEventLineStatus =
    'Running' | 'Stopping' | 'Stopped' | 'Idle'
export interface PerlinaBotEventLineOptions {
    processor: PerlinaBotEventProcessor
    eventTimeoutMs?: number
}
export interface PerlinaBotEventLineCounter {
    received: number
    processed: number
    dropped: number
    processing: number
    failed: number
    cancelled: number
}
export class PerlinaBotEventLineError extends Error {
    constructor(...args: any[]) {
        super(...args)
        this.name = 'PerlinaBotEventLineError'
    }
}
