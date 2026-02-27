import { env } from '@/env';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  allDay: boolean;
}

interface GoogleCalendarItem {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const now = new Date();
  // Fetch 6 months of events so client-side month navigation works without re-fetching
  const sixMonthsLater = new Date(now.getFullYear(), now.getMonth() + 6, 1);

  const params = new URLSearchParams({
    key: env.GOOGLE_CALENDAR_API_KEY,
    timeMin: now.toISOString(),
    timeMax: sixMonthsLater.toISOString(),
    singleEvents: 'true', // expand recurring events into individual instances
    orderBy: 'startTime',
    maxResults: '500',
  });

  const calendarId = encodeURIComponent(env.GOOGLE_CALENDAR_ID);
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`;

  const res = await fetch(url, { next: { revalidate: 300 } });

  if (!res.ok) {
    console.error('Google Calendar API error:', res.status, await res.text());
    return [];
  }

  const data = (await res.json()) as { items?: GoogleCalendarItem[] };

  if (!data.items) return [];

  return data.items.map((item) => ({
    id: item.id,
    title: item.summary ?? 'Untitled',
    description: item.description ?? '',
    location: item.location ?? '',
    start: item.start.dateTime ?? item.start.date ?? '',
    end: item.end.dateTime ?? item.end.date ?? '',
    allDay: !item.start.dateTime,
  }));
}
