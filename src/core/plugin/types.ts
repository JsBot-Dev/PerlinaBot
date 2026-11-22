import z from 'zod'
import type { PerlinaBotPluginContext } from './context'
import type { PerlinaBotEvent } from '@core/types'

export const PerlinaBotPluginMetaSchema = z.object({
    name: z.string(),
    export: z.string().optional().default('apply'),
})
export type PerlinaBotPluginMeta = z.infer<typeof PerlinaBotPluginMetaSchema>
export interface PerlinaBotLoadedPlugin {
    name: string,
    plugin: PerlinaBotPlugin
}
export type PerlinaBotPlugin = (ctx: PerlinaBotPluginContext) => void | Promise<void>
export type PerlinaBotPluginType = 'Bundled-Plugin' | 'External-Plugin'
export type PerlinaBotAdapter = (emit: (event: PerlinaBotEvent) => void) => void