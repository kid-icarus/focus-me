/* eslint-disable @typescript-eslint/camelcase */
import got from 'got';

const client = got.extend({
  prefixUrl: 'https://slack.com/api',
  timeout: 5000,
});

export const setDndOn = async (token: string, numMinutes: number) => {
  return client('dnd.setSnooze', {
    method: 'POST',
    form: { token, num_minutes: numMinutes },
  });
};

export const setDndOff = async (token: string) => {
  return client('dnd.endDnd', { method: 'POST', form: { token } });
};

interface StatusOpts {
  status_text: string;
  status_emoji: string;
  status_expiration?: number; // UTC epoch TS
}

export const setStatus = async (
  token: string,
  { status_text, status_emoji, status_expiration }: StatusOpts,
) => {
  return client('users.profile.set', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    json: { token, profile: { status_text, status_emoji, status_expiration } },
  });
};

export const clearStatus = async (token: string) => {
  return client('users.profile.set', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    json: { token, profile: { status_text: '', status_emoji: '' } },
  });
};
