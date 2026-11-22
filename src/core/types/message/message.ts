import type { PerlinaBotMessageChain } from './chain'
import type { PerlinaBotMessageSegment } from './segment'

export type PerlinaBotMessage = PerlinaBotMessageSegment[] | string

export type PerlinaBotOutgoingMessage =
    PerlinaBotMessageSegment[] | PerlinaBotMessageChain | string
