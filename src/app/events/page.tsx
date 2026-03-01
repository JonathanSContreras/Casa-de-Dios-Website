import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { getUpcomingEvents} from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Event } from '@/lib/sanity/types';

// Revalidate every 5 minutes
export const revalidate = 300;

// Helper to format date and time
function formatEventDateTime(event: Event) {
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const dateStr = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const startTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const timeStr = endDate
    ? `${startTime} - ${endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`
    : startTime;

  return { date: dateStr, time: timeStr };
}

export default async function EventsPage() {
  // Fetch upcoming events and ministry leaders from Sanity
  const upcomingEvents = await getUpcomingEvents();

  const weeklySchedule = [
    {
      id: 1,
      titleEn: 'Sunday School',
      titleEs: 'Escuela Dominical',
      day: 'Sunday / Domingo',
      time: '10:30 AM',
      location: 'Main Sanctuary',
      descEn: 'Traditional service with Bible study for all ages.',
      descEs: 'Servicio tradicional con estudio bíblico para todas las edades.',
    },
    {
      id: 2,
      titleEn: 'Evangelistic Service',
      titleEs: 'Servicio Evangelístico',
      day: 'Sunday / Domingo',
      time: '12:00 PM',
      location: 'Main Sanctuary',
      descEn: 'Modern worship with powerful biblical teaching.',
      descEs: 'Adoración moderna con poderosa enseñanza bíblica.',
    },
    {
      id: 3,
      titleEn: 'Prayer Service',
      titleEs: 'Servicio de Oración',
      day: 'Tuesday / Martes',
      time: '8:00 PM',
      location: 'Main Sanctuary',
      descEn: 'Midweek prayer and spiritual renewal.',
      descEs: 'Oración de mitad de semana y renovación espiritual.',
    },
    {
      id: 4,
      titleEn: 'Service per Association',
      titleEs: 'Servicio por Asociación',
      day: 'Friday / Viernes',
      time: '8:00 PM',
      location: 'Main Sanctuary',
      descEn: 'Community gathering and fellowship.',
      descEs: 'Reunión comunitaria y compañerismo.',
    },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative bg-[#1A5D5D] text-white py-20 lg:py-32 overflow-hidden">
        {/* TODO: Replace src with events page hero background image */}
        <Image src="/images/group-picture.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1A5D5D]/85" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Events</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Eventos</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            There&apos;s always something happening at Casa de Dios. Join us for worship, learning, and community.
          </p>
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Weekly Schedule</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Horario Semanal</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {weeklySchedule.map((event) => (
              <div key={event.id} className="bg-white p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-2">{event.titleEn}</h3>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-6">{event.titleEs}</h4>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-[#1A5D5D] flex-shrink-0" />
                    <span className="text-[#4A4A4A] font-medium">{event.day}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-[#1A5D5D] flex-shrink-0" />
                    <span className="text-[#4A4A4A]">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-[#1A5D5D] flex-shrink-0" />
                    <span className="text-[#4A4A4A]">{event.location}</span>
                  </div>
                </div>

                <p className="text-[#4A4A4A] mb-2">{event.descEn}</p>
                <p className="text-[#4A4A4A]">{event.descEs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto">
          <Image
            src="/images/church-anniversary.jpg"
            alt="Collage of pictures from church anniversary celebration 2025"
            className="w-full aspect-[21/9] lg:aspect-auto lg:h-[600px] object-cover"
            width={1440}
            height={600}
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="mb-16">
              <h2 className="text-4xl lg:text-6xl font-bold mb-4">Upcoming Events</h2>
              <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Próximos Eventos</h3>
            </div>

            <div className="space-y-8">
              {upcomingEvents.slice(0, 4).map((event) => {
                const { date, time } = formatEventDateTime(event);

                return (
                  <div key={event._id} className="bg-white border-4 border-[#1A5D5D]">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Event Image */}
                      {event.featuredImage && (
                        <div className="lg:col-span-3 relative">
                          <Image
                            src={urlFor(event.featuredImage).width(400).height(500).fit('crop').quality(90).url()}
                            alt={event.title}
                            className="w-full h-64 lg:h-full object-cover"
                            width={400}
                            height={500}
                          />
                        </div>
                      )}

                      {/* Event Details */}
                      <div className={event.featuredImage ? 'lg:col-span-9 p-8 lg:p-10' : 'lg:col-span-12 p-8 lg:p-10'}>
                        <h3 className="text-3xl font-bold mb-2">{event.title}</h3>
                        <h4 className="text-2xl font-bold text-[#4A4A4A] mb-6">{event.titleEs}</h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-start gap-3">
                            <Calendar size={24} className="text-[#1A5D5D] flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold mb-1">Date / Fecha</p>
                              <p className="text-[#4A4A4A]">{date}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock size={24} className="text-[#1A5D5D] flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-bold mb-1">Time / Hora</p>
                              <p className="text-[#4A4A4A]">{time}</p>
                            </div>
                          </div>
                          {event.location && (
                            <div className="flex items-start gap-3">
                              <MapPin size={24} className="text-[#1A5D5D] flex-shrink-0 mt-1" />
                              <div>
                                <p className="font-bold mb-1">Location / Ubicación</p>
                                <p className="text-[#4A4A4A]">{event.location} / {event.locationEs}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <p className="text-lg text-[#4A4A4A] mb-3">{event.description}</p>
                        <p className="text-lg text-[#4A4A4A] mb-6">{event.descriptionEs}</p>

                        {event.registrationLink && (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#1A5D5D] text-white px-8 py-3 font-bold hover:bg-[#154A4A] transition-colors"
                          >
                            Register / Registrarse →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
