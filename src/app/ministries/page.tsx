// import { Heart, Clock, MapPin, Mail, Users } from "lucide-react";
// import Image from "next/image";
// import { getActiveMinistries } from "@/lib/sanity/queries";
// import { urlFor } from "@/lib/sanity/image";
// import type { MinistryWithLeader } from "@/lib/sanity/types";

// // Revalidate every hour (ministries change infrequently)
// export const revalidate = 3600;

// export default async function MinistriesPage() {
//   // Fetch active ministries from Sanity with populated leader data
//   const ministries: MinistryWithLeader[] = await getActiveMinistries();

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h1 className="text-5xl font-serif mb-6">Our Ministries</h1>
//           <p className="text-xl text-blue-100">
//             Discover the many ways you can serve, grow, and connect through our ministries.
//           </p>
//         </div>
//       </section>

//       {/* Ministries List */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           {ministries.length === 0 ? (
//             <div className="text-center py-12">
//               <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//               <p className="text-slate-600 text-lg">
//                 Ministry information coming soon. Check back later!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-8">
//               {ministries.map((ministry) => (
//                 <div
//                   key={ministry._id}
//                   className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-200"
//                 >
//                   <div className="p-8">
//                     {/* Ministry Header */}
//                     <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
//                       <div className="flex-1 mb-6 lg:mb-0">
//                         <div className="flex items-center gap-3 mb-3">
//                           <Heart className="w-8 h-8 text-blue-600 flex-shrink-0" />
//                           <h2 className="text-3xl font-serif text-slate-800">
//                             {ministry.name}
//                           </h2>
//                         </div>

//                         <p className="text-slate-600 leading-relaxed mb-4">
//                           {ministry.description}
//                         </p>

//                         {/* Meeting Info */}
//                         <div className="flex flex-wrap gap-4 text-sm">
//                           {ministry.meetingTime && (
//                             <div className="flex items-center gap-2 text-slate-600">
//                               <Clock className="w-4 h-4 text-blue-600" />
//                               <span>{ministry.meetingTime}</span>
//                             </div>
//                           )}

//                           {ministry.location && (
//                             <div className="flex items-center gap-2 text-slate-600">
//                               <MapPin className="w-4 h-4 text-blue-600" />
//                               <span>{ministry.location}</span>
//                             </div>
//                           )}

//                           {ministry.contactEmail && (
//                             <div className="flex items-center gap-2 text-slate-600">
//                               <Mail className="w-4 h-4 text-blue-600" />
//                               <a
//                                 href={`mailto:${ministry.contactEmail}`}
//                                 className="text-blue-600 hover:text-blue-700 hover:underline"
//                               >
//                                 {ministry.contactEmail}
//                               </a>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Leader Info */}
//                       {ministry.leader && (
//                         <div className="bg-slate-50 rounded-lg p-6 lg:w-80 flex-shrink-0">
//                           <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
//                             Ministry Leader
//                           </h3>

//                           <div className="flex items-center gap-4">
//                             {/* Leader Photo */}
//                             {ministry.leader.photo ? (
//                               <Image
//                                 src={urlFor(ministry.leader.photo)
//                                   .width(80)
//                                   .height(80)
//                                   .fit('crop')
//                                   .url()}
//                                 width={64}
//                                 height={64}
//                                 alt={ministry.leader.name}
//                                 className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
//                               />
//                             ) : (
//                               <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
//                                 <Users className="w-8 h-8 text-blue-600" />
//                               </div>
//                             )}

//                             {/* Leader Details */}
//                             <div className="flex-1">
//                               <p className="font-medium text-slate-800">
//                                 {ministry.leader.name}
//                               </p>
//                               <p className="text-sm text-slate-600">
//                                 {ministry.leader.role}
//                               </p>
//                               {ministry.leader.email && (
//                                 <a
//                                   href={`mailto:${ministry.leader.email}`}
//                                   className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
//                                 >
//                                   Contact
//                                 </a>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 bg-blue-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-serif mb-4">Ready to Get Involved?</h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Every ministry needs passionate volunteers. Find your place and make an impact!
//           </p>
//           <a
//             href="/contact"
//             className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors"
//           >
//             Contact Us to Learn More
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }
'use client';

import { Users, X, Mail } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
interface LeaderInfo {
  name: string;
  role: string;
  email: string;
  imageUrl: string;
}

interface Ministry {
  id: number;
  titleEn: string;
  titleEs: string;
  shortDescEn: string;
  shortDescEs: string;
  fullDescEn: string;
  fullDescEs: string;
  leadership: LeaderInfo[];
}

interface MinistrySectionProps {
  ministries: Ministry[];
}

export default function Ministries() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const ministries: Ministry[] = [
    {
      id: 1,
      titleEn: "Children's Ministry",
      titleEs: 'Ministerio de Niños',
      shortDescEn: "Engaging programs for infants through 5th grade, helping kids discover God's love.",
      shortDescEs: 'Programas atractivos para bebés hasta 5to grado, ayudando a los niños a descubrir el amor de Dios.',
      fullDescEn: "Our Children's Ministry creates a safe, fun, and engaging environment where kids can learn about God's love through age-appropriate lessons, worship, and activities. We serve children from birth through 5th grade with dedicated teachers and volunteers who are passionate about helping kids grow in their faith. Each Sunday, children participate in interactive Bible stories, creative crafts, worship music, and games that reinforce biblical truths.",
      fullDescEs: 'Nuestro Ministerio de Niños crea un ambiente seguro, divertido y atractivo donde los niños pueden aprender sobre el amor de Dios a través de lecciones, adoración y actividades apropiadas para su edad. Servimos a niños desde el nacimiento hasta el 5to grado con maestros y voluntarios dedicados que son apasionados por ayudar a los niños a crecer en su fe.',
      leadership: [
        {
          name: 'Sarah Martinez',
          role: "Children's Director / Directora de Niños",
          email: 'sarah@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Michael Chen',
          role: 'Elementary Coordinator / Coordinador de Primaria',
          email: 'michael.chen@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Jessica Williams',
          role: 'Preschool Coordinator / Coordinadora de Preescolar',
          email: 'jessica.w@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Daniel Foster',
          role: 'Nursery Coordinator / Coordinador de Guardería',
          email: 'daniel.f@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
      ],
    },
    {
      id: 2,
      titleEn: 'Youth Ministry',
      titleEs: 'Ministerio de Jóvenes',
      shortDescEn: 'Empowering students in grades 6-12 to live out their faith boldly.',
      shortDescEs: 'Empoderando a estudiantes de grados 6-12 a vivir su fe con valentía.',
      fullDescEn: 'Our Youth Ministry is designed to empower middle and high school students (grades 6-12) to develop a real and lasting relationship with Jesus Christ. We meet every Friday night for high-energy worship, relevant biblical teaching, small group discussions, and fun activities. We also host retreats, mission trips, and special events throughout the year. Our goal is to create a community where teens feel accepted, challenged, and equipped to live out their faith in everyday life.',
      fullDescEs: 'Nuestro Ministerio de Jóvenes está diseñado para empoderar a estudiantes de secundaria y preparatoria (grados 6-12) a desarrollar una relación real y duradera con Jesucristo. Nos reunimos todos los viernes por la noche para adoración enérgica, enseñanza bíblica relevante, discusiones en grupos pequeños y actividades divertidas.',
      leadership: [
        {
          name: 'Pastor Carlos Rodriguez',
          role: 'Youth Pastor / Pastor de Jóvenes',
          email: 'carlos@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Maria Rodriguez',
          role: 'Youth Ministry Co-Lead / Co-Líder del Ministerio de Jóvenes',
          email: 'maria.r@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Brandon Taylor',
          role: 'High School Leader / Líder de Preparatoria',
          email: 'brandon.t@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Ashley Moore',
          role: 'Middle School Leader / Líder de Secundaria',
          email: 'ashley.m@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Jordan Lee',
          role: 'Worship Leader / Líder de Alabanza',
          email: 'jordan.l@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
      ],
    },
    {
      id: 3,
      titleEn: 'Small Groups',
      titleEs: 'Grupos Pequeños',
      shortDescEn: 'Connect with others in a smaller setting for deeper relationships and spiritual growth.',
      shortDescEs: 'Conéctate con otros en un entorno más pequeño para relaciones más profundas y crecimiento espiritual.',
      fullDescEn: 'Small Groups are the heart of our community at Living Hope Church. These groups of 8-15 people meet weekly in homes throughout the city for Bible study, prayer, fellowship, and mutual support. Small Groups provide a place where you can be known, grow in your faith, and build meaningful relationships. We offer groups for various life stages and interests, including groups for young adults, married couples, parents, men, women, and more. Groups meet on different days and times to accommodate various schedules.',
      fullDescEs: 'Los Grupos Pequeños son el corazón de nuestra comunidad en Living Hope Church. Estos grupos de 8-15 personas se reúnen semanalmente en hogares en toda la ciudad para estudiar la Biblia, orar, tener compañerismo y apoyo mutuo. Los Grupos Pequeños proporcionan un lugar donde puedes ser conocido, crecer en tu fe y construir relaciones significativas.',
      leadership: [
        {
          name: 'David Kim',
          role: 'Small Groups Pastor / Pastor de Grupos Pequeños',
          email: 'david.k@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Jennifer Kim',
          role: 'Small Groups Coordinator / Coordinadora de Grupos Pequeños',
          email: 'jennifer.k@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Robert Thompson',
          role: "Men's Groups Leader / Líder de Grupos de Hombres",
          email: 'robert.t@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Linda Johnson',
          role: "Women's Groups Leader / Líder de Grupos de Mujeres",
          email: 'linda.j@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
      ],
    },
    {
      id: 4,
      titleEn: 'Worship Ministry',
      titleEs: 'Ministerio de Alabanza',
      shortDescEn: 'Leading our congregation in heartfelt worship through music and creative arts.',
      shortDescEs: 'Guiando a nuestra congregación en adoración sincera a través de la música y las artes creativas.',
      fullDescEn: 'Our Worship Ministry is dedicated to creating authentic worship experiences that connect people with God. Our team includes vocalists, instrumentalists, sound technicians, and media volunteers who work together to facilitate powerful times of worship. We offer opportunities for musicians and singers of all skill levels to serve, with regular rehearsals and training to help team members grow in their gifts.',
      fullDescEs: 'Nuestro Ministerio de Alabanza está dedicado a crear experiencias de adoración auténticas que conecten a las personas con Dios. Nuestro equipo incluye vocalistas, instrumentistas, técnicos de sonido y voluntarios de medios que trabajan juntos para facilitar momentos poderosos de adoración.',
      leadership: [
        {
          name: 'Pastor David Kim',
          role: 'Worship Pastor / Pastor de Alabanza',
          email: 'worship@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Amanda Cruz',
          role: 'Worship Leader / Líder de Alabanza',
          email: 'amanda.c@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Marcus Johnson',
          role: 'Band Director / Director de Banda',
          email: 'marcus.j@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
      ],
    },
    {
      id: 5,
      titleEn: 'Outreach & Missions',
      titleEs: 'Alcance y Misiones',
      shortDescEn: 'Serving our local community and supporting global missions to share the love of Christ.',
      shortDescEs: 'Sirviendo a nuestra comunidad local y apoyando misiones globales para compartir el amor de Cristo.',
      fullDescEn: 'Our Outreach & Missions Ministry is committed to making a difference both locally and globally. We partner with local organizations to serve our community through food distribution, homeless outreach, and community events. We also support missionaries around the world and organize short-term mission trips for our members to serve internationally.',
      fullDescEs: 'Nuestro Ministerio de Alcance y Misiones está comprometido a hacer una diferencia tanto local como globalmente. Nos asociamos con organizaciones locales para servir a nuestra comunidad a través de distribución de alimentos, alcance a personas sin hogar y eventos comunitarios.',
      leadership: [
        {
          name: 'Pastor Michael Johnson',
          role: 'Outreach Pastor / Pastor de Alcance',
          email: 'outreach@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Elena Ramirez',
          role: 'Missions Coordinator / Coordinadora de Misiones',
          email: 'elena.r@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'James Wilson',
          role: 'Community Outreach Leader / Líder de Alcance Comunitario',
          email: 'james.w@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
      ],
    },
    {
      id: 6,
      titleEn: 'Hospitality & Welcome',
      titleEs: 'Hospitalidad y Bienvenida',
      shortDescEn: 'Creating a warm, welcoming environment for everyone who walks through our doors.',
      shortDescEs: 'Creando un ambiente cálido y acogedor para todos los que entran por nuestras puertas.',
      fullDescEn: 'Our Hospitality & Welcome Ministry ensures that everyone who visits Living Hope Church feels valued and welcomed. Our team serves as greeters, ushers, and hosts, helping visitors find their way and connecting them with resources. We also coordinate our welcome center, newcomer events, and church-wide gatherings to help people feel at home.',
      fullDescEs: 'Nuestro Ministerio de Hospitalidad y Bienvenida asegura que todos los que visitan Living Hope Church se sientan valorados y bienvenidos. Nuestro equipo sirve como recepcionistas, ujieres y anfitriones, ayudando a los visitantes a orientarse y conectándolos con recursos.',
      leadership: [
        {
          name: 'Grace Taylor',
          role: 'Hospitality Director / Directora de Hospitalidad',
          email: 'grace.t@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Samuel Park',
          role: 'Greeter Coordinator / Coordinador de Recepcionistas',
          email: 'samuel.p@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
        {
          name: 'Rachel Green',
          role: 'Newcomer Experience / Experiencia de Nuevos Visitantes',
          email: 'rachel.g@livinghope.org',
          imageUrl: '/images/placeholder-2.jpg',
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#1A5D5D] text-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Ministries</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Ministerios</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            Discover ways to connect, grow, and serve through our various ministries at Living Hope Church.
          </p>
        </div>
      </section>

      {/* Ministries Grid Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Explore Our Ministries</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Explora Nuestros Ministerios</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {ministries.map((ministry) => (
              <div key={ministry.id} className="p-8 border-4 border-[#1A5D5D]">
                <Users size={48} className="text-[#1A5D5D] mb-6" />
                <h3 className="text-2xl font-bold mb-2">{ministry.titleEn}</h3>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">{ministry.titleEs}</h4>
                <p className="text-[#4A4A4A] mb-2">{ministry.shortDescEn}</p>
                <p className="text-[#4A4A4A] mb-6">{ministry.shortDescEs}</p>
                <button
                  onClick={() => setSelectedMinistry(ministry)}
                  className="w-full bg-[#1A5D5D] text-white px-6 py-3 font-bold hover:bg-[#154A4A] transition-colors"
                >
                  More Information / Más Información
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get Involved</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-[#4A4A4A] mb-8">Involúcrate</h3>
            <p className="text-xl text-[#4A4A4A] mb-4">
              Every ministry at Living Hope Church is built by volunteers who use their gifts to serve others. 
              There&apos;s a place for you to make a difference.
            </p>
            <p className="text-xl text-[#4A4A4A] mb-8">
              Cada ministerio en Living Hope Church está construido por voluntarios que usan sus dones para servir a otros. 
              Hay un lugar para que marques la diferencia.
            </p>
            <a
              href="mailto:info@livinghope.org"
              className="inline-block bg-[#1A5D5D] text-white px-12 py-5 font-bold text-lg hover:bg-[#154A4A] transition-colors"
            >
              Contact Us to Serve / Contáctanos para Servir
            </a>
          </div>
        </div>
      </section>

      {/* Ministry Modal */}
      {selectedMinistry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-md"
          onClick={() => setSelectedMinistry(null)}
        >
          <div
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#1A5D5D] text-white p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedMinistry.titleEn}</h2>
                <h3 className="text-2xl font-bold">{selectedMinistry.titleEs}</h3>
              </div>
              <button
                onClick={() => setSelectedMinistry(null)}
                className="text-white hover:text-[#E5E5E5] transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            <div className="p-8 lg:p-12">
              <div className="space-y-6 mb-12">
                <div>
                  <h4 className="text-xl font-bold mb-3">About This Ministry</h4>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed">{selectedMinistry.fullDescEn}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Acerca de Este Ministerio</h4>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed">{selectedMinistry.fullDescEs}</p>
                </div>
              </div>

              <div className="bg-[#F8F9FA] p-8 lg:p-10">
                <h4 className="text-2xl font-bold mb-8">Leadership Team / Equipo de Liderazgo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedMinistry.leadership.map((leader, index) => (
                    <div key={index} className="bg-white p-6">
                      <Image
                        src={leader.imageUrl}
                        alt={leader.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h5 className="text-lg font-bold mb-1">{leader.name}</h5>
                      <p className="text-sm text-[#4A4A4A] mb-4">{leader.role}</p>
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center gap-2 text-[#1A5D5D] hover:text-[#154A4A] transition-colors"
                      >
                        <Mail size={16} />
                        <span className="text-sm">{leader.email}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
