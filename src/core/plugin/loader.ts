import fg from 'fast-glob'
import path from 'node:path'
import fs from 'node:fs/promises'
import { readYamlFile } from '@core/utils'
import { PerlinaBotPluginMetaSchema, type PerlinaBotLoadedPlugin, type PerlinaBotPlugin, type PerlinaBotPluginType } from './types'

async function searchPlugins(pluginType: PerlinaBotPluginType) {
    const subDir = pluginType === 'Bunled-Plugin' ? 'bunled' : 'external'
    const files = await fg(`src/plugin/${subDir}/*/meta.yaml`, {
        absolute: true,
        onlyFiles: true,
    })
    const plugins: { dir: string; meta: string; entry: string }[] = []
    for (const file of files) {
        const dirname = path.dirname(file)
        const entry = path.join(dirname, 'main.ts')
        try {
            await fs.access(entry)
            plugins.push({
                dir: dirname,
                meta: file,
                entry: entry,
            })
        } catch { }
    }

    return plugins
}

export async function pluginLoader(pluginType: PerlinaBotPluginType) {
    const dirs = await searchPlugins(pluginType)
    const plugins: PerlinaBotLoadedPlugin[] = []
    for (const pluginDirs of dirs) {
        const meta = await readYamlFile(pluginDirs.meta, PerlinaBotPluginMetaSchema)
        const apply = (await import(pluginDirs.entry))[await meta.export] as PerlinaBotPlugin
        plugins.push({
            name: meta.name,
            plugin: apply
        })
    }
    return plugins
}