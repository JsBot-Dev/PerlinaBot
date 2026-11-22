import { PerlinaBotReadError } from '@core/utils'

export class PerlinaBotConfigError extends PerlinaBotReadError {
    constructor(...args: any[]) {
        super(...args)
        this.name = 'PerlinaBotConfigError'
    }
}
