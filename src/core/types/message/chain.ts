import type { PerlinaBotMessageSegment } from './segment'

export class PerlinaBotMessageChain<IsReply extends boolean = false> {
    private chain: PerlinaBotMessageSegment[]
    constructor(message?: PerlinaBotMessageSegment[]) {
        this.chain = message ?? []
    }
    text(message: string) {
        return new PerlinaBotMessageChain<IsReply>([
            ...this.chain,
            { type: 'text', text: message },
        ])
    }
    image(file: string) {
        return new PerlinaBotMessageChain<IsReply>([
            ...this.chain,
            { type: 'image', file },
        ])
    }
    record(file: string) {
        return new PerlinaBotMessageChain<IsReply>([
            ...this.chain,
            { type: 'record', file },
        ])
    }
    at(user: string) {
        return new PerlinaBotMessageChain<IsReply>([
            ...this.chain,
            { type: 'at', user_id: user },
        ])
    }
    reply(this: PerlinaBotMessageChain<false>, message_id: string) {
        return new PerlinaBotMessageChain<true>([
            ...this.chain,
            { type: 'reply', message_id },
        ])
    }
    file(file: string) {
        return new PerlinaBotMessageChain<IsReply>([
            ...this.chain,
            { type: 'file', file },
        ])
    }
}
export function chain() {
    return new PerlinaBotMessageChain()
}

export function text(message: string) {
    return new PerlinaBotMessageChain([{ type: 'text', text: message }])
}

export function image(file: string) {
    return new PerlinaBotMessageChain([{ type: 'image', file }])
}

export function record(file: string) {
    return new PerlinaBotMessageChain([{ type: 'record', file }])
}

export function at(user: string) {
    return new PerlinaBotMessageChain([{ type: 'at', user_id: user }])
}

export function file(file: string) {
    return new PerlinaBotMessageChain([{ type: 'file', file }])
}
