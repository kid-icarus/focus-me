#!/usr/bin/env node

import { Timer }  from './emitter'
import * as fs from 'fs'
import * as findUp from 'find-up';
import * as path from "path";

const configPath = findUp.sync(['.timerrc', '.timerrc.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};

const plugins = Object.entries(config.plugins).map(([pluginName, pluginConfig]) => {
  let plugin;
  console.log(pluginName)
  console.log(pluginConfig)
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
timer.on('starting', () => {
  console.log('STARTING')
})

timer.on('started', () => {
  console.log('started')
})
timer.on('stopping', () => {
  console.log('congrats! stopping!')
})
process.on('SIGINT', () => {
  timer.stop(false)
});
timer.on('stopped', () => {
  console.log('stopped')
  process.exit();
})
timer.start()

