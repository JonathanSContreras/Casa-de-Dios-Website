import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { getUpcomingEvents, getAllLeadersByMinistry } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Event, MinistryType } from '@/lib/sanity/types';
import { MinistrySection } from './_components/MinistrySection';

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
  const leadersByMinistry = await getAllLeadersByMinistry();

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

  // Ministry information with real leaders from Sanity
  const ministries = [
    {
      id: 'mens' as MinistryType,
      titleEn: "Men's Ministry",
      titleEs: 'Ministerio de Hombres',
      shortDescEn: 'Equipping men to be godly leaders in their homes, church, and community.',
      shortDescEs: 'Equipando a los hombres para ser líderes piadosos en sus hogares, iglesia y comunidad.',
      fullDescEn:
        "Our Men's Ministry exists to help men grow in their faith, develop authentic relationships, and become the spiritual leaders God has called them to be. Through Bible studies, prayer meetings, service projects, and fellowship events, men are encouraged to support one another in their walk with Christ and make a positive impact in their families and communities.",
      fullDescEs:
        'Nuestro Ministerio de Hombres existe para ayudar a los hombres a crecer en su fe, desarrollar relaciones auténticas y convertirse en los líderes espirituales que Dios los ha llamado a ser.',
      leaders: leadersByMinistry.mens,
    },
    {
      id: 'womens' as MinistryType,
      titleEn: "Women's Ministry",
      titleEs: 'Ministerio de Mujeres',
      shortDescEn: 'Creating a community where women can grow spiritually and support one another.',
      shortDescEs: 'Creando una comunidad donde las mujeres puedan crecer espiritualmente y apoyarse mutuamente.',
      fullDescEn:
        "Our Women's Ministry provides a welcoming environment where women of all ages can connect, grow in their relationship with Christ, and encourage one another. We offer Bible studies, prayer groups, retreats, and service opportunities designed to help women discover their God-given purpose and build lasting friendships.",
      fullDescEs:
        'Nuestro Ministerio de Mujeres proporciona un ambiente acogedor donde mujeres de todas las edades pueden conectarse, crecer en su relación con Cristo y animarse mutuamente.',
      leaders: leadersByMinistry.womens,
    },
    {
      id: 'youth' as MinistryType,
      titleEn: 'Youth Ministry',
      titleEs: 'Ministerio de Jóvenes',
      shortDescEn: 'Empowering students in grades 6-12 to live out their faith boldly.',
      shortDescEs: 'Empoderando a estudiantes de grados 6-12 a vivir su fe con valentía.',
      fullDescEn:
        'Our Youth Ministry is designed to empower middle and high school students (grades 6-12) to develop a real and lasting relationship with Jesus Christ. We meet regularly for high-energy worship, relevant biblical teaching, small group discussions, and fun activities. We also host retreats, mission trips, and special events throughout the year. Our goal is to create a community where teens feel accepted, challenged, and equipped to live out their faith in everyday life.',
      fullDescEs:
        'Nuestro Ministerio de Jóvenes está diseñado para empoderar a estudiantes de secundaria y preparatoria (grados 6-12) a desarrollar una relación real y duradera con Jesucristo.',
      leaders: leadersByMinistry.youth,
    },
    {
      id: 'kids' as MinistryType,
      titleEn: 'Kids Ministry',
      titleEs: 'Ministerio de Niños',
      shortDescEn: "Engaging programs for children, helping kids discover God's love.",
      shortDescEs: 'Programas atractivos para niños, ayudando a los niños a descubrir el amor de Dios.',
      fullDescEn:
        "Our Kids Ministry creates a safe, fun, and engaging environment where children can learn about God's love through age-appropriate lessons, worship, and activities. We serve children with dedicated teachers and volunteers who are passionate about helping kids grow in their faith. Each week, children participate in interactive Bible stories, creative crafts, worship music, and games that reinforce biblical truths.",
      fullDescEs:
        'Nuestro Ministerio de Niños crea un ambiente seguro, divertido y atractivo donde los niños pueden aprender sobre el amor de Dios a través de lecciones, adoración y actividades apropiadas para su edad.',
      leaders: leadersByMinistry.kids,
    },
    {
      id: 'street-evangelism' as MinistryType,
      titleEn: 'Street Evangelism',
      titleEs: 'Evangelismo Callejero',
      shortDescEn: 'Taking the Gospel to the streets and serving our community with love and action.',
      shortDescEs: 'Llevando el Evangelio a las calles y sirviendo a nuestra comunidad con amor y acción.',
      fullDescEn:
        'Our Street Evangelism ministry is passionate about reaching those who may never step foot in a church building. We take the message of Jesus directly to the streets, sharing the Gospel, praying with people, and meeting practical needs through food distribution, clothing drives, and community outreach events. We believe in demonstrating the love of Christ through both words and actions.',
      fullDescEs:
        'Nuestro ministerio de Evangelismo Callejero es apasionado por alcanzar a aquellos que quizás nunca pongan un pie en un edificio de iglesia. Llevamos el mensaje de Jesús directamente a las calles.',
      leaders: leadersByMinistry['street-evangelism'],
    },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#1A5D5D] text-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Events & Ministries</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Eventos y Ministerios</h2>
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
            src="/images/group-picture.jpg"
            alt="Church service"
            className="w-full h-[400px] lg:h-[600px] object-cover"
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Event Image */}
                      {event.featuredImage && (
                        <div className="lg:col-span-4">
                          <Image
                            // src={urlFor(event.featuredImage).width(600).height(800).fit('crop').url()}
                            src={'/images/placeholder-1.jpg'}
                            alt={event.title}
                            className="w-full h-64 lg:h-full object-cover"
                            width={600}
                            height={800}
                          />
                        </div>
                      )}

                      {/* Event Details */}
                      <div className={event.featuredImage ? 'lg:col-span-8 p-8 lg:p-10' : 'lg:col-span-12 p-8 lg:p-10'}>
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

      {/* Ministries Section with Modal */}
      <MinistrySection ministries={ministries} />
    </div>
  );
}
