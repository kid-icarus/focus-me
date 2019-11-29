import { TrackerDb } from './tracker';

export const compareTimesFromYesterday = (db: TrackerDb): number => {
  return db.filter((entry: Record<string, Record<string, string>>) => {
    const date = new Date();
    const timestamp = new Date(parseInt(Object.keys(entry)[0], 10));
    return (
      timestamp.getHours() < date.getHours() ||
      (timestamp.getHours() === date.getHours() &&
        timestamp.getMinutes() <= date.getMinutes())
    );
  }).length;
};
