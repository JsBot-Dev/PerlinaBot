import type { PerlinaBotPluginContext } from "@core/plugin/context";
import { createInterface } from "node:readline";

export function apply(ctx: PerlinaBotPluginContext) {
    ctx.adapter((emit) => {
        const stdio = createInterface({
            input: process.stdin,
            output: process.stdout
        })
        stdio.setPrompt('>')
        stdio.prompt()
        stdio.on('line', (line) => {
            if (!line.trim()) return
            emit({
                event_type: 'Message',
                message_type: 'Private',
                message_id: String(Date.now()),
                time: Date.now(),
                sender: {
                    user_id: 'console',
                },
                message: line.trim(),
                direction: 'Incoming',
                self_id: 'console',
                platform: {
                    type: 'Console',
                    name: 'Console'
                }
            })
        })
        return () => stdio.close()
    })
}