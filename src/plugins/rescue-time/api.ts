import got from 'got';

const client = got.extend({
  prefixUrl: 'https://www.rescuetime.com/anapi',
});

export const startFocustime = async (apiKey: string, duration: number) => {
  const searchParams = new URLSearchParams([
    ['key', apiKey],
    ['duration', duration.toString()],
  ]);

  return client('start_focustime', { searchParams, method: 'POST' });
};

export const endFocustime = async (apiKey: string) => {
  const searchParams = new URLSearchParams([['key', apiKey]]);
  return client('end_focustime', { searchParams });
};
