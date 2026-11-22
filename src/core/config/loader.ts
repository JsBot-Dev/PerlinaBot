import { readYamlFile } from '@core/utils'
import { PerlinaBotBasicConfigSchema } from './schema'

export async function configLoader(configPath: string) {
    return readYamlFile(configPath, PerlinaBotBasicConfigSchema)
}
