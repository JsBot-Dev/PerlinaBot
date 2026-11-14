import type { PerlinaBotMessageChain } from './chain'
import type { PerlinaBotMessageSegment } from './segment'

export type PerlinaBotMessage =
    PerlinaBotMessageSegment[] | PerlinaBotMessageChain | string
