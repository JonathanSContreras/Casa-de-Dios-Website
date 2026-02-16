import { Calendar, MapPin, Clock, Heart, Music, Gift, BookOpen, Users, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getActiveAnnouncements, getAllEvents } from "@/lib/sanity/queries";
import type { Announcement, Event } from "@/lib/sanity/types";
import { urlFor } from '@/lib/sanity/image';

// Revalidate every 5 minutes (announcements and events change frequently)
export const revalidate = 300;

// Helper function to get icon based on event category
function getEventCategoryIcon(category: string) {
  const iconClass = "w-6 h-6 text-white";
  switch (category) {
    case "Outreach":
      return <Heart className={iconClass} />;
    case "Youth":
      return <Music className={iconClass} />;
    case "Worship":
      return <Gift className={iconClass} />;
    case "Prayer":
      return <BookOpen className={iconClass} />;
    case "Fellowship":
      return <Users className={iconClass} />;
    case "Bible Study":
      return <BookOpen className={iconClass} />;
    default:
      return <Calendar className={iconClass} />;
  }
}

export default async function HomePage() {
  // Fetch active announcements and featured events from Sanity
  const announcements: Announcement[] = await getActiveAnnouncements();

  // TEMPORARY: Using getAllEvents() to show all events regardless of date
  // Change back to getFeaturedEvents(3) once you update event dates to 2026
  const allEvents: Event[] = await getAllEvents();
  const upcomingEvents: Event[] = allEvents.slice(0, 3); // Get first 3 events

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

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#1A5D5D] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8">
              Welcome Home
            </h1>
            <h2 className="text-5xl lg:text-7xl font-bold mb-12">
              Bienvenido a Casa
            </h2>
            <p className="text-xl lg:text-2xl mb-4 text-[#E5E5E5]">
              Join us for Sunday School at 10:30 AM and worship every Sunday 12:00 PM
            </p>
            <p className="text-xl lg:text-2xl mb-12 text-[#E5E5E5]">
              Únase a nosotros para la Escuela Dominical a las 10:30 AM y adorar todos los domingos a las 12:00 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#1A5D5D] px-10 py-4 font-bold text-lg text-center hover:bg-[#F8F9FA] transition-colors"
              >
                Plan Your Visit / Planea tu Visita
              </Link>
              <Link
                href="/events"
                className="border-2 border-white text-white px-10 py-4 font-bold text-lg text-center hover:bg-white hover:text-[#1A5D5D] transition-colors"
              >
                View Events / Ver Eventos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sunday School</h3>
              <p className="text-lg text-[#4A4A4A] mb-2">10:30 AM</p>
              <p className="text-lg text-[#4A4A4A]">Escuela Dominical</p>
            </div>
            <div className="text-center">
              <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sunday Service</h3>
              <p className="text-lg text-[#4A4A4A] mb-2">12:00 PM</p>
              <p className="text-lg text-[#4A4A4A]">Servicio Dominical</p>
            </div>
            <div className="text-center">
              <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Tuesday Prayer</h3>
              <p className="text-lg text-[#4A4A4A] mb-2">8:00 PM</p>
              <p className="text-lg text-[#4A4A4A]">Oración del Martes</p>
            </div>
            <div className="text-center">
              <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Worship Service</h3>
              <p className="text-lg text-[#4A4A4A] mb-2">8:00 PM</p>
              <p className="text-lg text-[#4A4A4A]">Servicio de Adoracion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <Bell size={48} className="text-[#1A5D5D]" />
              <h2 className="text-4xl lg:text-6xl font-bold">Announcements</h2>
            </div>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Anuncios</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="bg-white border-l-8 border-[#1A5D5D] p-8">
                {announcement.dateLabel && (
                  <p className="text-sm font-bold text-[#1A5D5D] mb-3">
                    {announcement.dateLabel}{announcement.dateLabelEs && ` / ${announcement.dateLabelEs}`}
                  </p>
                )}
                <h3 className="text-2xl font-bold mb-2">{announcement.title}</h3>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">{announcement.titleEs}</h4>
                <p className="text-[#4A4A4A] mb-2">{announcement.message}</p>
                <p className="text-[#4A4A4A]">{announcement.messageEs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                A Place to Belong
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  At House of God Church, we believe that church is more than a building—it&apos;s a family. 
                  We&apos;re a diverse community of believers who come together to worship God, grow in faith, 
                  and serve our city.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Whether you&apos;re exploring faith for the first time or have been following Jesus for years, 
                  you&apos;ll find a welcoming home here.
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-[#1A5D5D] text-white px-8 py-4 font-bold mt-4 hover:bg-[#154A4A] transition-colors"
                >
                  Learn More About Us / Conócenos Más
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                Un Lugar para Pertenecer
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  En Casa de Dios, creemos que la iglesia es más que un edificio: es una familia. 
                  Somos una comunidad diversa de creyentes que se reúnen para adorar a Dios, crecer en la fe 
                  y servir a nuestra ciudad.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Ya sea que estés explorando la fe por primera vez o hayas estado siguiendo a Jesús durante años, 
                  encontrarás un hogar acogedor aquí.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto">
          <Image
            src="/images/group-picture.jpg"
            alt="Church worship service"
            className="w-full h-[400px] lg:h-[600px] object-cover"
            width={1920}
            height={600}
          />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Upcoming Events</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Próximos Eventos</h3>
          </div>

          {}{upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#4A4A4A] text-lg">
                No upcoming events at this time. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event: Event) => {
                const { date, time } = formatEventDateTime(event);

                return (
                  <div className="bg-white border-4 border-[#1A5D5D]" key={event._id}>
                    <div className='p-8'>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <h4 className="text-xl font-bold text-[#4A4A4A] mb-6">{event.titleEs}</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar size={20} className="text-[#1A5D5D] flex-shrink-0"/>
                          <span className="text-[#4A4A4A]">{date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock size={20} className="text-[#1A5D5D] flex-shrink-0" />
                          <span className="text-[#4A4A4A]">{time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={20} className="text-[#1A5D5D] flex-shrink-0" />
                          <span className="text-[#4A4A4A]">{event.location ?? 'Temple/ Templo'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            // <div className="space-y-8">
            //   {upcomingEvents.map((event: Event) => {
            //     const { date, time } = formatEventDateTime(event);

            //     return (
            //       <div
            //         className="bg-white border-4 border-[#1A5D5D] overflow-hidden"
            //         key={event._id}
            //       >
            //         <div className="grid grid-cols-1 lg:grid-cols-2">
            //           {/* Text content on the left */}
            //           <div className="p-8 lg:p-12 flex flex-col justify-center">
            //             <h3 className="text-3xl lg:text-4xl font-bold mb-2">{event.title}</h3>
            //             <h4 className="text-2xl lg:text-3xl font-bold text-[#4A4A4A] mb-6">{event.titleEs}</h4>

            //             {event.description && (
            //               <p className="text-[#4A4A4A] mb-6 line-clamp-3">
            //                 {event.description}
            //               </p>
            //             )}

            //             <div className="space-y-3 mb-6">
            //               <div className="flex items-center gap-3">
            //                 <Calendar size={24} className="text-[#1A5D5D] flex-shrink-0"/>
            //                 <span className="text-[#4A4A4A] text-lg">{date}</span>
            //               </div>
            //               <div className="flex items-center gap-3">
            //                 <Clock size={24} className="text-[#1A5D5D] flex-shrink-0" />
            //                 <span className="text-[#4A4A4A] text-lg">{time}</span>
            //               </div>
            //               <div className="flex items-center gap-3">
            //                 <MapPin size={24} className="text-[#1A5D5D] flex-shrink-0" />
            //                 <span className="text-[#4A4A4A] text-lg">{event.location ?? 'Temple / Templo'}</span>
            //               </div>
            //             </div>

            //             {event.registrationLink && (
            //               <a
            //                 href={event.registrationLink}
            //                 target="_blank"
            //                 rel="noopener noreferrer"
            //                 className="inline-block bg-[#1A5D5D] text-white px-8 py-3 font-bold hover:bg-[#154A4A] transition-colors w-fit"
            //               >
            //                 Register / Registrarse
            //               </a>
            //             )}
            //           </div>

            //           {/* Image on the right */}
            //           <div className="relative h-64 lg:h-auto">
            //             {event.featuredImage ? (
            //               <Image
            //                 src={urlFor(event.featuredImage).width(800).height(600).fit('crop').quality(90).url()}
            //                 alt={event.title}
            //                 fill
            //                 className="object-cover"
            //                 sizes="(max-width: 1024px) 100vw, 50vw"
            //               />
            //             ) : (
            //               <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center">
            //                 <div className="bg-[#1A5D5D] w-20 h-20 flex items-center justify-center">
            //                   {getEventCategoryIcon(event.category)}
            //                 </div>
            //               </div>
            //             )}
            //           </div>
            //         </div>
            //       </div>
            //     );
            //   })}
            // </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-block border-2 border-[#1A5D5D] text-[#1A5D5D] px-10 py-4 font-bold hover:bg-[#1A5D5D] hover:text-white transition-colors"
            >
              View All Events / Ver Todos los Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Give Section */}
      <section className="bg-[#1A5D5D] text-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Give / Ofrendar
            </h2>
            <p className="text-xl lg:text-2xl mb-4 text-[#E5E5E5]">
              Your generosity helps us share hope and transform lives in our community.
            </p>
            <p className="text-xl lg:text-2xl mb-12 text-[#E5E5E5]">
              Tu generosidad nos ayuda a compartir esperanza y transformar vidas en nuestra comunidad.
            </p>
            <Link
              href="/give"
              className="inline-block bg-white text-[#1A5D5D] px-12 py-5 font-bold text-lg hover:bg-[#F8F9FA] transition-colors"
            >
              Give Online / Dar en Línea
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
