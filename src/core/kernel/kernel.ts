import { type PerlinaBotBasicConfig } from '@core/config'
import { PerlinaBotEventLine } from '@core/event'
import type { PerlinaBotKernelOptions } from './types'

export class PerlinaBotKernel {
    #eventLine: PerlinaBotEventLine
    #config: Readonly<PerlinaBotBasicConfig>
    constructor(options: PerlinaBotKernelOptions) {
        this.#config = options.config
        this.#eventLine = new PerlinaBotEventLine({
            processor: options.processor,
        })
    }
    start() {
        this.#eventLine.start()
    }
    stop() {
        this.#eventLine.stop()
    }
    get config() {
        return { ...this.#config }
    }
    get eventLine() {
        return this.#eventLine
    }
}
