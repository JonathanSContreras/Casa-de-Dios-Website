'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, X } from 'lucide-react';
import type { CalendarEvent } from '@/lib/google-calendar';

const DAY_HEADERS = [
  { en: 'Sun', es: 'Dom' },
  { en: 'Mon', es: 'Lun' },
  { en: 'Tue', es: 'Mar' },
  { en: 'Wed', es: 'Mié' },
  { en: 'Thu', es: 'Jue' },
  { en: 'Fri', es: 'Vie' },
  { en: 'Sat', es: 'Sáb' },
];

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function toDateKey(isoString: string): string {
  // Works for both "YYYY-MM-DD" and "YYYY-MM-DDTHH:mm:ss±HH:mm"
  return isoString.slice(0, 10);
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago', // Church is in Houston, TX
  });
}

function formatSelectedDate(dateKey: string): { en: string; es: string } {
  // Use noon to avoid any timezone-related date shifts
  const date = new Date(`${dateKey}T12:00:00`);
  return {
    en: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    es: date.toLocaleDateString('es-MX', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

interface CalendarDay {
  dateKey: string;
  day: number;
  currentMonth: boolean;
}

interface Props {
  events: CalendarEvent[];
  calendarId: string;
}

export function CalendarGrid({ events, calendarId }: Props) {
  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  // Group events by date key
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const event of events) {
      const key = toDateKey(event.start);
      if (!map[key]) map[key] = [];
      map[key].push(event);
    }
    return map;
  }, [events]);

  // Build the 42-cell calendar grid (6 rows × 7 cols)
  const calendarDays = useMemo((): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth(); // 0-indexed

    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    // Leading days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      // prevMonth in 1-indexed = month (since month is 0-indexed, month === 1-indexed prev month)
      const pm = month === 0 ? 12 : month;
      const py = month === 0 ? year - 1 : year;
      days.push({
        dateKey: `${py}-${String(pm).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        day: d,
        currentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        dateKey: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        day: d,
        currentMonth: true,
      });
    }

    // Trailing days from next month to fill 42 cells
    const remaining = 42 - days.length;
    const nm = month === 11 ? 1 : month + 2; // next month, 1-indexed
    const ny = month === 11 ? year + 1 : year;
    for (let d = 1; d <= remaining; d++) {
      days.push({
        dateKey: `${ny}-${String(nm).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        day: d,
        currentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  const selectedEvents = selectedDateKey ? (eventsByDate[selectedDateKey] ?? []) : [];
  const selectedDateLabel = selectedDateKey ? formatSelectedDate(selectedDateKey) : null;

  const monthLabel = `${MONTHS_EN[currentMonth.getMonth()]} / ${MONTHS_ES[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  function handleDayClick(dateKey: string) {
    setSelectedDateKey((prev) => (prev === dateKey ? null : dateKey));
  }

  return (
    <div>
      {/* Month navigation header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="p-3 hover:bg-[#1A5D5D] hover:text-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={22} />
        </button>

        <h2 className="text-2xl lg:text-3xl font-bold text-center">{monthLabel}</h2>

        <button
          onClick={() => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="p-3 hover:bg-[#1A5D5D] hover:text-white transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 bg-[#1A5D5D]">
        {DAY_HEADERS.map((d) => (
          <div key={d.en} className="py-3 text-center">
            <span className="text-sm font-bold text-white">{d.en}</span>
            <span className="block text-xs text-white/60">{d.es}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
        {calendarDays.map(({ dateKey, day, currentMonth: isCurrent }) => {
          const dayEvents = eventsByDate[dateKey] ?? [];
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDateKey;
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={dateKey}
              onClick={() => handleDayClick(dateKey)}
              className={`bg-white min-h-[80px] lg:min-h-[110px] p-2 text-left transition-colors ${
                isSelected
                  ? 'ring-2 ring-inset ring-[#1A5D5D] bg-[#F0F8F8]'
                  : hasEvents
                  ? 'hover:bg-[#F0F8F8]'
                  : 'cursor-default'
              }`}
            >
              {/* Date number */}
              <span
                className={`inline-flex items-center justify-center w-7 h-7 text-sm font-semibold mb-1 rounded-full ${
                  isToday
                    ? 'bg-[#1A5D5D] text-white'
                    : isCurrent
                    ? 'text-[#1A1A1A]'
                    : 'text-[#C5C5C5]'
                }`}
              >
                {day}
              </span>

              {/* Event chips — visible on sm+ */}
              <div className="space-y-0.5 hidden sm:block">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs bg-[#1A5D5D] text-white px-1.5 py-0.5 truncate leading-tight"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <span className="text-xs text-[#1A5D5D] font-semibold pl-0.5">
                    +{dayEvents.length - 2} more
                  </span>
                )}
              </div>

              {/* Event dots — mobile only */}
              {dayEvents.length > 0 && (
                <div className="flex gap-1 mt-1 sm:hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span key={event.id} className="w-1.5 h-1.5 rounded-full bg-[#1A5D5D] block" />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-[#1A5D5D] font-bold">+</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day event detail panel */}
      {selectedDateKey && (
        <div className="mt-8 bg-white border-l-4 border-[#1A5D5D] p-6 lg:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold capitalize">{selectedDateLabel?.en}</h3>
              <h4 className="text-lg font-bold text-[#4A4A4A] capitalize">{selectedDateLabel?.es}</h4>
            </div>
            <button
              onClick={() => setSelectedDateKey(null)}
              className="text-[#9A9A9A] hover:text-[#1A5D5D] transition-colors p-1"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="space-y-8">
              {selectedEvents.map((event) => (
                <div key={event.id}>
                  <h4 className="text-xl font-bold mb-3">{event.title}</h4>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[#1A5D5D] flex-shrink-0" />
                      <span className="text-[#4A4A4A]">
                        {event.allDay
                          ? 'All Day / Todo el día'
                          : `${formatTime(event.start)}${event.end ? ` – ${formatTime(event.end)}` : ''}`}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-[#1A5D5D] flex-shrink-0" />
                        <span className="text-[#4A4A4A]">{event.location}</span>
                      </div>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-[#4A4A4A] leading-relaxed">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#9A9A9A]">
              No services scheduled. / No hay servicios programados.
            </p>
          )}
        </div>
      )}

      {/* Add to Google Calendar link */}
      <div className="mt-6 text-right">
        <a
          href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#1A5D5D] hover:underline"
        >
          + Add to Google Calendar / Agregar a Google Calendar
        </a>
      </div>
    </div>
  );
}
