import Link from 'next/link';
import { getCalendarEvents } from '@/lib/google-calendar';
import { CalendarGrid } from './_components/CalendarGrid';
import { env } from '@/env';

export const revalidate = 300;

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero */}
      <section className="bg-[#1A5D5D] text-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Calendar</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Calendario</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            Stay up to date with our services and weekly activities. Click any day to see details.
          </p>
          <p className="text-lg lg:text-xl max-w-3xl text-[#E5E5E5] mt-3">
            Mantente al día con nuestros servicios y actividades semanales. Haz clic en cualquier día para ver los detalles.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <CalendarGrid events={events} calendarId={env.GOOGLE_CALENDAR_ID} />
        </div>
      </section>

      {/* Link to special events */}
      <section className="py-16 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <h3 className="text-2xl font-bold mb-2">Looking for Special Events?</h3>
          <h4 className="text-xl font-bold text-[#4A4A4A] mb-6">¿Buscas Eventos Especiales?</h4>
          <p className="text-[#4A4A4A] mb-2 max-w-xl mx-auto">
            Conferences, concerts, community outreach and more — visit our Events page for details, flyers, and registration.
          </p>
          <p className="text-[#4A4A4A] mb-8 max-w-xl mx-auto">
            Conferencias, conciertos, alcance comunitario y más — visita nuestra página de Eventos para detalles, volantes y registro.
          </p>
          <Link
            href="/events"
            className="inline-block bg-[#1A5D5D] text-white px-10 py-3 font-bold hover:bg-[#154A4A] transition-colors"
          >
            View Events / Ver Eventos →
          </Link>
        </div>
      </section>
    </div>
  );
}
