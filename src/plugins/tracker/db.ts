import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);
import { TrackerDb } from './tracker';

const getDbPath = () => {
  if (!process.env.HOME) {
    throw new Error('$HOME not defined, cannot find path to db');
  }

  return path.join(process.env.HOME, '.timerdb');
};

const getDbFilename = (date: Date): string =>
  path.join(
    getDbPath(),
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`,
  );

export const readDb = async (date: Date): Promise<TrackerDb> => {
  if (!process.env.HOME) {
    throw new Error('$HOME not defined, cannot write data');
  }

  const file = await readFile(getDbFilename(date), 'utf8');
  return JSON.parse(file);
};

export const writeDb = async (
  date: Date,
  entries: Record<string, Record<string, string>>[],
): Promise<void> => {
  const dbPath = getDbPath();
  try {
    await access(dbPath, fs.constants.F_OK);
  } catch (e) {
    await mkdir(dbPath);
  }

  try {
    await writeFile(getDbFilename(date), JSON.stringify(entries));
  } catch (e) {
    console.error('Could not write to database!', e);
  }
};
