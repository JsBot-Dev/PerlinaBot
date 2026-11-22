export class PerlinaBotReadError extends Error {
    constructor(...args: any[]) {
        super(...args)
        this.name = 'PerlinaBotReadError'
    }
}
