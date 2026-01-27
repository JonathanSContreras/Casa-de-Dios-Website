// import Link from "next/link";
// import Image from "next/image";
// import { Clock, Calendar, Users, Heart, AlertCircle, Info, Bell, Music, BookOpen, Gift } from "lucide-react";
// import { getActiveAnnouncements, getAllEvents } from "@/lib/sanity/queries";
// import type { Announcement, Event } from "@/lib/sanity/types";

// // Revalidate every 5 minutes (announcements and events change frequently)
// export const revalidate = 300;

// // Helper function to get icon based on event category
// function getEventCategoryIcon(category: string) {
//   const iconClass = "w-6 h-6 text-blue-600";
//   switch (category) {
//     case "Outreach":
//       return <Heart className={iconClass} />;
//     case "Youth":
//       return <Music className={iconClass} />;
//     case "Worship":
//       return <Gift className={iconClass} />;
//     case "Prayer":
//       return <BookOpen className={iconClass} />;
//     case "Fellowship":
//       return <Users className={iconClass} />;
//     case "Bible Study":
//       return <BookOpen className={iconClass} />;
//     default:
//       return <Calendar className={iconClass} />;
//   }
// }

// export default async function HomePage() {
//   // Fetch active announcements and featured events from Sanity
//   const announcements: Announcement[] = await getActiveAnnouncements();

//   // TEMPORARY: Using getAllEvents() to show all events regardless of date
//   // Change back to getFeaturedEvents(3) once you update event dates to 2026
//   const allEvents: Event[] = await getAllEvents();
//   const upcomingEvents: Event[] = allEvents.slice(0, 3); // Get first 3 events
//   const serviceTimes = [
//     {
//       name: "Sunday School",
//       day: "Sunday",
//       time: "10:30 AM",
//       description: "Traditional Service",
//     },
//     {
//       name: "Evangelistic Service",
//       day: "Sunday",
//       time: "12:00 PM",
//       description: "Modern Worship",
//     },
//     {
//       name: "Prayer Service",
//       day: "Tuesday",
//       time: "8:00 PM",
//       description: "Midweek Fellowship",
//     },
//     {
//       name: "Service per Association",
//       day: "Friday",
//       time: "8:00 PM",
//       description: "Community Gathering",
//     }
//   ];


//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center">
//         <div className="absolute inset-0">
//           <Image
//             src="/images/group-picture.jpg"
//             alt="Casa de Dios Group Picture"
//             width={1920}
//             height={1080}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//         </div>
        
//         <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
//           <h1 className="text-5xl md:text-7xl font-serif mb-6">
//             Welcome Home
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 text-blue-100">
//             &quot;Come to me, all you who are weary and burdened, and I will give you rest.&quot; - Matthew 11:28
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link 
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
//               href={"/contact"}
//             >
//               Plan a Visit
//             </Link>
//             <Link 
//               className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3"
//               href={"/contact"}
//             >
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Announcements Section */}
//       {announcements.length > 0 && (
//         <section className="py-12 bg-slate-50 border-b-2 border-slate-200">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex items-center gap-2 mb-6">
//               <Bell className="w-6 h-6 text-blue-600" />
//               <h2 className="text-2xl font-semibold text-slate-800">Announcements</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {announcements.map((announcement) => {
//                 // Priority-based styling
//                 const priorityStyles = {
//                   urgent: {
//                     border: 'border-l-4 border-red-500 bg-red-50',
//                     icon: <AlertCircle className="w-5 h-5 text-red-600" />,
//                     iconBg: 'bg-red-100',
//                     badge: 'bg-red-100 text-red-800',
//                   },
//                   normal: {
//                     border: 'border-l-4 border-blue-500 bg-blue-50',
//                     icon: <Info className="w-5 h-5 text-blue-600" />,
//                     iconBg: 'bg-blue-100',
//                     badge: 'bg-blue-100 text-blue-800',
//                   },
//                   low: {
//                     border: 'border-l-4 border-gray-400 bg-white',
//                     icon: <Info className="w-5 h-5 text-gray-600" />,
//                     iconBg: 'bg-gray-100',
//                     badge: 'bg-gray-100 text-gray-800',
//                   },
//                 };

//                 const style = priorityStyles[announcement.priority];
//                 const publishDate = new Date(announcement.publishDate).toLocaleDateString('en-US', {
//                   month: 'short',
//                   day: 'numeric',
//                 });

//                 return (
//                   <div
//                     key={announcement._id}
//                     className={`${style.border} rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow`}
//                   >
//                     <div className="flex items-start gap-3 mb-3">
//                       <div className={`${style.iconBg} p-2 rounded-lg flex-shrink-0`}>
//                         {style.icon}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-2">
//                           <span className={`${style.badge} text-xs font-medium px-2 py-1 rounded-full uppercase`}>
//                             {announcement.priority}
//                           </span>
//                           <span className="text-xs text-slate-500">{publishDate}</span>
//                         </div>
//                         <h3 className="font-semibold text-slate-800 mb-2">
//                           {announcement.title}
//                         </h3>
//                       </div>
//                     </div>

//                     <p className="text-sm text-slate-600 mb-3 leading-relaxed">
//                       {announcement.message}
//                     </p>

//                     {announcement.link && (
//                       <a
//                         href={announcement.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
//                       >
//                         Learn More →
//                       </a>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Service Times */}
//       <section className="py-16 bg-blue-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-serif text-slate-800 mb-4">Join Us for Worship</h2>
//             <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//               Come as you are and experience the love of Christ in our welcoming community.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {serviceTimes.map((service) => (
//               <div className="text-center" key={service.name}>
//                 <div className="p-8">
//                   <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-medium mb-2">{service.name}</h3>
//                   <p className="text-2xl font-serif text-blue-600 mb-2">{service.time}</p>
//                   <p className="text-slate-600">{service.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Upcoming Highlights */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-serif text-slate-800 mb-4">Upcoming Events</h2>
//             <p className="text-xl text-slate-600">Don&apos;t miss these special gatherings</p>
//           </div>

//           {upcomingEvents.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-slate-600 text-lg">
//                 No upcoming events at this time. Check back soon!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {upcomingEvents.map((event: Event) => {
//                 const eventDate = new Date(event.startDate).toLocaleDateString('en-US', {
//                   month: 'long',
//                   day: 'numeric',
//                   year: 'numeric',
//                 });

//                 return (
//                   <div className="p-6" key={event._id}>
//                     <div className="flex items-start gap-4">
//                       <div className="bg-blue-100 p-3 rounded-lg">
//                         {getEventCategoryIcon(event.category)}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-medium mb-2">{event.title}</h3>
//                         <p className="text-slate-600 mb-2">{eventDate}</p>
//                         <p className="text-sm text-slate-500 line-clamp-2">
//                           {event.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <div className="text-center mt-12">
//             <Link
//               className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
//               href={"/events"}
//             >
//               View All Events
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="py-16 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-serif text-slate-800 mb-6">
//                 You Belong Here
//               </h2>
//               <p className="text-lg text-slate-600 mb-6">
//                 At Grace Community Church, we believe that everyone has a place in God&apos;s family. 
//                 Whether you&apos;re seeking, questioning, or have been walking with Christ for years,
//                 we welcome you with open arms.
//               </p>
//               <p className="text-lg text-slate-600 mb-8">
//                 Our community is built on love, acceptance, and the transforming power of the Gospel. 
//                 Come discover how God wants to use your unique gifts and story for His glory.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link
//                   className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
//                   href={"/about"}
//                 >
//                   Learn More About Us
//                 </Link>
//                 <Link
//                   className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
//                   href={"/contact"}
//                 >
//                   Get Connected
//                 </Link>
//               </div>
//             </div>
//             <div className="relative">
//               <Image
//                 src="/images/group-picture.JPG"
//                 alt="Church community fellowship"
//                 width={600}
//                 height={400}
//                 className="rounded-lg shadow-lg w-full h-auto"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { Calendar, MapPin, Clock, Heart, Music, Gift, BookOpen, Users} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getActiveAnnouncements, getAllEvents } from "@/lib/sanity/queries";
import type { Announcement, Event } from "@/lib/sanity/types";

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
              Join us for worship every Sunday at 9:00 AM & 11:00 AM
            </p>
            <p className="text-xl lg:text-2xl mb-12 text-[#E5E5E5]">
              Únete a nosotros para adorar cada domingo a las 9:00 AM y 11:00 AM
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
