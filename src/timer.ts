#!/usr/bin/env node

import { Timer }  from './emitter'
import * as fs from 'fs'
import * as findUp from 'find-up';
import * as path from "path";

const configPath = findUp.sync(['.timerrc', '.timerrc.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};

const plugins = Object.entries(config.plugins).map(([k, v]) => {
  let plugin;
  try {
    plugin = require(path.join(__dirname, 'plugins', k, k))
  } catch (e) {

  }

  if (!plugin) {
    try {
      plugin = require(k)
    } catch (e) {
      console.error(`could not load plugin ${k}`)
      throw e
    }
  }

  return {name: k, plugin: plugin.default}
});

const timer = new Timer(config, plugins);
timer.on('starting', () => {
  console.log('STARTING')
})

timer.on('started', () => {
  console.log('started')
})
timer.start()
timer.on('tick', (until) => {
  const mins = Math.floor(until / 60).toString().padStart(2, '0');
  const secs = (until % 60).toString().padStart(2, '0');
  const timeRemaining = `${mins}:${secs}`;
  console.log(timeRemaining)
})
