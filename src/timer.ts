#!/usr/bin/env node

import { Timer }  from './emitter'
import * as fs from 'fs'
import * as findUp from 'find-up';
import * as path from "path";

const configPath = findUp.sync(['.timerrc', '.timerrc.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};

const plugins = Object.entries(config.plugins).map(([pluginName, pluginConfig]) => {
  let plugin;
  try {
    plugin = require(path.join(__dirname, 'plugins', pluginName, pluginName))
  } catch (e) {

  }

  if (!plugin) {
    try {
      plugin = require(pluginName)
    } catch (e) {
      console.error(`could not load plugin ${pluginName}`)
      throw e
    }
  }

  return {name: pluginName, plugin: plugin.default, config: pluginConfig}
});

const timer = new Timer(config, plugins);

process.on('SIGINT', () => {
  timer.stop(false)
});

timer.on('stopped', () => {
  console.log('stopped')
  process.exit();
})

timer.start()

