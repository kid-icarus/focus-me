/* eslint-disable @typescript-eslint/camelcase */
import got, { Response } from 'got';

const client = got.extend({
  prefixUrl: 'https://www.rescuetime.com/anapi',
  timeout: 5000,
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
  return client('end_focustime', { searchParams, method: 'POST' });
};

interface AnalyticsRequest {
  perspective?: 'rank' | 'interval';
  resolution_time?: 'month' | 'week' | 'day' | 'hour' | 'minute';
  restrict_begin?: string; //2020-08-18T00:05:00, start hour/minute not supported
  restrict_end?: string; // 'YYYY-MM-DD' iso8601, start hour/minute not supported
  restrict_kind?: 'category' | 'activity' | 'productivity' | 'document';
  restrict_source_type?: 'computers' | 'mobile' | 'offline';
  restrict_thing?: string; // application, category, whatever
  restrict_thingy?: string; // sub-thing. application window title, etc.
  restrict_schedule_id?: number;
}

interface AnalyticsResponse {
  notes: string;
  row_headers: string[];
  rows: any[][];
}

export const getAnalytics = async (
  apiKey: string,
  opts: AnalyticsRequest,
): Promise<Response<AnalyticsResponse[]>> => {
  const searchParams = new URLSearchParams([['key', apiKey]]);
  const analytics = await client('data', { searchParams });
  return JSON.parse(analytics.body);
};

const getProductivityDuringSession = async (apiKey: string) => {
  const response = await getAnalytics(apiKey, {
    perspective: 'interval',
    resolution_time: 'minute',
    restrict_kind: 'productivity',
  });
};

interface DailySummaryResponse {
  id: number;
  date: string;
  productivity_pulse: number;
  very_productive_percentage: number;
  productive_percentage: number;
  neutral_percentage: number;
  distracting_percentage: number;
  very_distracting_percentage: number;
  all_productive_percentage: number;
  all_distracting_percentage: number;
  uncategorized_percentage: number;
  business_percentage: number;
  communication_and_scheduling_percentage: number;
  social_networking_percentage: number;
  design_and_composition_percentage: number;
  entertainment_percentage: number;
  news_percentage: number;
  software_development_percentage: number;
  reference_and_learning_percentage: number;
  shopping_percentage: number;
  utilities_percentage: number;
  total_hours: number;
  very_productive_hours: number;
  productive_hours: number;
  neutral_hours: number;
  distracting_hours: number;
  very_distracting_hours: number;
  all_productive_hours: number;
  all_distracting_hours: number;
  uncategorized_hours: number;
  business_hours: number;
  communication_and_scheduling_hours: number;
  social_networking_hours: number;
  design_and_composition_hours: number;
  entertainment_hours: number;
  news_hours: number;
  software_development_hours: number;
  reference_and_learning_hours: number;
  shopping_hours: number;
  utilities_hours: number;
  total_duration_formatted: string;
  very_productive_duration_formatted: string;
  productive_duration_formatted: string;
  neutral_duration_formatted: string;
  distracting_duration_formatted: string;
  very_distracting_duration_formatted: string;
  all_productive_duration_formatted: string;
  all_distracting_duration_formatted: string;
  uncategorized_duration_formatted: string;
  business_duration_formatted: string;
  communication_and_scheduling_duration_formatted: string;
  social_networking_duration_formatted: string;
  design_and_composition_duration_formatted: string;
  entertainment_duration_formatted: string;
  news_duration_formatted: string;
  software_development_duration_formatted: string;
  reference_and_learning_duration_formatted: string;
  shopping_duration_formatted: string;
  utilities_duration_formatted: string;
}

export const getDailySummary = async (
  apiKey: string,
): Promise<Response<DailySummaryResponse[]>> => {
  const searchParams = new URLSearchParams([['key', apiKey]]);
  const analytics = await client('daily_summary_feed', { searchParams });
  return JSON.parse(analytics.body);
};
