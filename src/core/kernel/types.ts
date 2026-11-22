import type { PerlinaBotBasicConfig } from '@core/config'
import type { PerlinaBotEventProcessor } from '@core/event/processor'

export interface PerlinaBotKernelOptions {
    config: Readonly<PerlinaBotBasicConfig>
    processor: PerlinaBotEventProcessor
}
