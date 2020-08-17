import * as path from 'path';
import { TimerConfig } from './load-config';

export interface Plugin {
  start: (config: any) => Promise<void>;
  stop: (config: any, completed: boolean) => Promise<void>;
  tick?: (config: any, until: number) => Promise<void>;
}

export interface PluginWrapper {
  name: string;
  plugin: Plugin;
  config: PluginConfig;
}

export interface PluginConfig {
  enabled: boolean;
}

export const loadPlugins = (config: TimerConfig): PluginWrapper[] => {
  if (!config.plugins) return [];

  const { plugins } = config;

  return Object.entries(plugins).map(([pluginName, pluginConfig]) => {
    let plugin;
    try {
      plugin = require(path.join(
        __dirname,
        '..',
        'plugins',
        pluginName,
        pluginName,
      ));
    } catch (e) {}

    if (!plugin) {
      try {
        plugin = require(pluginName);
      } catch (e) {
        console.error(`could not load plugin ${pluginName}`);
        throw e;
      }
    }

    return { name: pluginName, plugin: plugin.default, config: pluginConfig };
  });
};
