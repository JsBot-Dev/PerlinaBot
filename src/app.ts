import { configLoader } from "@core/config";
import { PerlinaBotKernel } from "@core/kernel";
import { PerlinaBotPluginHost } from "@core/plugin/host";
import { pluginLoader } from "@core/plugin/loader";

const config = await configLoader('data/config/bot.config.yaml')
const bundledPlugins = await pluginLoader('Bundled-Plugin')
const externalPlugins = await pluginLoader('External-Plugin')
const host = new PerlinaBotPluginHost([...bundledPlugins, ...externalPlugins])
const Kernel = new PerlinaBotKernel({
    config: config,
    processor: host
})
await host.setup()
Kernel.start()
host.onEvent((event) => Kernel.eventLine.push(event))
await host.start()