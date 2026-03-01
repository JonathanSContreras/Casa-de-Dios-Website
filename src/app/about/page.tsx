import { Heart, Users, Globe, Book } from 'lucide-react';
import Image from 'next/image';
import { getChurchLeadership } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Leadership } from "@/lib/sanity/types";

// Revalidate every hour (leadership changes infrequently)
export const revalidate = 3600;

export default async function AboutPage() {
  // Fetch leadership from Sanity
  const leadership: Leadership[] = await getChurchLeadership();

  const values = [
    {
      id: 1,
      icon: Heart,
      titleEn: 'Love',
      titleEs: 'Amor',
      descEn: 'We believe in loving God and loving people without conditions or limits.',
      descEs: 'Creemos en amar a Dios y amar a las personas sin condiciones ni límites.',
    },
    {
      id: 2,
      icon: Users,
      titleEn: 'Community',
      titleEs: 'Comunidad',
      descEn: 'We are stronger together, supporting and encouraging one another in faith.',
      descEs: 'Somos más fuertes juntos, apoyándonos y animándonos unos a otros en la fe.',
    },
    {
      id: 3,
      icon: Globe,
      titleEn: 'Service',
      titleEs: 'Servicio',
      descEn: 'We are called to serve our community and make a positive impact in our city.',
      descEs: 'Estamos llamados a servir a nuestra comunidad y tener un impacto positivo en nuestra ciudad.',
    },
    {
      id: 4,
      icon: Book,
      titleEn: 'Truth',
      titleEs: 'Verdad',
      descEn: 'We are committed to teaching and living according to biblical truth.',
      descEs: 'Estamos comprometidos a enseñar y vivir de acuerdo con la verdad bíblica.',
    },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative bg-[#1A5D5D] text-white py-20 lg:py-32 overflow-hidden">
        {/* TODO: Replace src with about page hero background image */}
        <Image src="/images/group-picture.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1A5D5D]/85" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">About Us</h1>
          <h2 className="text-5xl lg:text-7xl font-bold">Sobre Nosotros</h2>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Founded in April 2010 by Pastors Francisca Melendez-Contreras and Saul Contreras, what began as a small gathering of faithful believers has grown into a thriving community rooted in the power of God, the love of Jesus Christ, and movement of the Holy Spirit.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  In those early days, services were held in the humble setting of the Cordero family&apos;s garage — a simple space filled with sincere worship and a hunger for God&apos;s presence. As the colder months drew near, the Flores family graciously opened their home, offering warmth and shelter so the church could continue to grow. From the very beginning, the faithfulness of God&apos;s people laid the foundation for everything that followed.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  By 2011, the congregation had outgrown its surroundings. In His provision, God opened an unexpected door — Church Rock of Salvation extended an invitation to share their facility, welcoming the congregation with open arms. It was in that season that the hand of God moved in undeniable ways: souls were saved, families were restored, and lives were transformed in the name of Jesus.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Within two years, God provided again. The church secured its own dedicated space, marking a significant milestone in its journey. From that location, the congregation continued to serve the surrounding community — hosting outreach events, ministering to families in need, and seeing God&apos;s grace poured out week after week. What had started in a garage had become a place where lives were being changed.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  For nearly a decade, the church served faithfully from that location. But as the congregation continued to grow, the space could no longer contain what God was doing. In 2021, the church relocated to a larger facility — not simply out of necessity, but as a reflection of the expanding vision God had placed on its heart.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  In this new season, the hand of God continues to move. Families are being restored, prodigals are returning to Christ, and the church stands more equipped than ever to serve the broader community. The relocation has opened new doors for outreach, service, and impact — and we believe the best is still ahead.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  We are a church built on faith, sustained by prayer, and driven by one purpose: to see lives transformed by the love of Jesus Christ.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Nuestra Historia</h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Fundada en abril de 2010 por los pastores Francisca Meléndez-Contreras y Saúl Contreras, lo que comenzó como una pequeña reunión de fieles creyentes se ha convertido en una comunidad próspera, arraigada en el poder de Dios, el amor de Jesucristo y el obrar del Espíritu Santo.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  En aquellos primeros días, los servicios se celebraban en el humilde garaje de la familia Cordero, un espacio sencillo lleno de adoración sincera y un anhelo por la presencia de Dios. Al acercarse los meses más fríos, la familia Flores abrió amablemente su hogar, ofreciendo calor y refugio para que la iglesia pudiera seguir creciendo. Desde el principio, la fidelidad del pueblo de Dios sentó las bases de todo lo que vino después.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Para 2011, la congregación había superado su entorno. En su provisión, Dios abrió una puerta inesperada: la Iglesia Roca de Salvación extendió una invitación para compartir sus instalaciones, recibiendo a la congregación con los brazos abiertos. Fue en esa época que la mano de Dios se movió de maneras innegables: almas fueron salvadas, familias restauradas y vidas transformadas en el nombre de Jesús.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  En dos años, Dios proveyó de nuevo. La iglesia consiguió su propio espacio, lo que marcó un hito importante en su trayectoria. Desde ese lugar, la congregación continuó sirviendo a la comunidad circundante, organizando eventos de alcance comunitario, ministrando a familias necesitadas y viendo la gracia de Dios derramarse semana tras semana. Lo que comenzó en un garaje se había convertido en un lugar donde vidas cambiaban.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Durante casi una década, la iglesia sirvió fielmente desde ese lugar. Pero a medida que la congregación seguía creciendo, el espacio ya no podía contener lo que Dios estaba haciendo. En 2021, la iglesia se trasladó a unas instalaciones más grandes, no solo por necesidad, sino como reflejo de la visión expansiva que Dios había puesto en su corazón.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  En esta nueva época, la mano de Dios continúa obrando. Familias están siendo restauradas, los pródigos están regresando a Cristo y la iglesia está más preparada que nunca para servir a la comunidad en general. La reubicación ha abierto nuevas puertas para la difusión, el servicio y el impacto, y creemos que lo mejor está por venir.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Somos una iglesia cimentada en la fe, sostenida por la oración e impulsada por un solo propósito: ver vidas transformadas por el amor de Jesucristo.
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
            alt="Community gathering"
            className="w-full aspect-[21/9] lg:aspect-auto lg:h-[600px] object-cover"
            width={1920}
            height={600}
          />
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Our Values</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Nuestros Valores</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.id} className="bg-white p-10">
                  <Icon size={48} className="text-[#1A5D5D] mb-6" />
                  <h3 className="text-2xl font-bold mb-2">{value.titleEn}</h3>
                  <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">{value.titleEs}</h4>
                  <p className="text-lg text-[#4A4A4A] mb-3">{value.descEn}</p>
                  <p className="text-lg text-[#4A4A4A]">{value.descEs}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Leadership Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Our Leadership</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Nuestro Liderazgo</h3>
          </div>

          {}{leadership.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#4A4A4A] text-lg">
                Leadership information coming soon. / Información de liderazgo próximamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {leadership.map((leader) => (
              <div key={leader._id} className="border-4 border-[#1A5D5D] p-8">
                <div className="bg-[#E5E5E5] w-full h-64 mb-6">
                  {leader.photo ? (
                    <Image
                      src={urlFor(leader.photo).width(400).height(400).fit('crop').url()}
                      width={400}
                      height={400}
                      alt={leader.name}
                      className="w-full h-full object-cover object-[50%_0%]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C4C4C4] flex items-center justify-center">
                      <Users size={64} className="text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                {leader.role && <p className="text-[#1A5D5D] font-bold mb-4">{leader.role}</p>}
                <p className="text-[#4A4A4A]">{leader.bio}</p>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Image break before Beliefs */}
      {/* TODO: Replace src with sanctuary or atmospheric worship image */}
      {/* <section className="bg-white">
        <div className="max-w-[1440px] mx-auto">
          <Image
            src="/images/group-picture.jpg"
            alt="Church sanctuary"
            className="w-full h-[400px] lg:h-[550px] object-cover"
            width={1920}
            height={550}
          />
        </div>
      </section> */}

      {/* Beliefs Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">What We Believe</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">En Qué Creemos</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3">The Bible</h3>
                <p className="text-lg text-[#4A4A4A]">
                  We believe the Bible is the inspired and authoritative Word of God, our guide for faith and life.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">God</h3>
                <p className="text-lg text-[#4A4A4A]">
                  We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Jesus Christ</h3>
                <p className="text-lg text-[#4A4A4A]">
                  We believe Jesus is the Son of God who died for our sins and rose again, offering salvation to all.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">The Holy Spirit</h3>
                <p className="text-lg text-[#4A4A4A]">
                  We believe the Holy Spirit empowers believers for life and ministry with spiritual gifts.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3">La Biblia</h3>
                <p className="text-lg text-[#4A4A4A]">
                  Creemos que la Biblia es la Palabra inspirada y autoritativa de Dios, nuestra guía para la fe y la vida.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Dios</h3>
                <p className="text-lg text-[#4A4A4A]">
                  Creemos en un Dios que existe eternamente en tres personas: Padre, Hijo y Espíritu Santo.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Jesucristo</h3>
                <p className="text-lg text-[#4A4A4A]">
                  Creemos que Jesús es el Hijo de Dios que murió por nuestros pecados y resucitó, ofreciendo salvación a todos.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">El Espíritu Santo</h3>
                <p className="text-lg text-[#4A4A4A]">
                  Creemos que el Espíritu Santo empodera a los creyentes para la vida y el ministerio con dones espirituales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
