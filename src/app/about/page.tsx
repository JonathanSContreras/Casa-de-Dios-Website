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
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Living Hope Church was founded in 2009 with a simple vision: to be a place where everyone can 
                  encounter God&apos;s love and discover their purpose. What started as a small group of families has 
                  grown into a vibrant, multicultural community of faith.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  We are a contemporary Pentecostal church that values both the power of the Holy Spirit and the 
                  depth of biblical teaching. Our worship is energetic and authentic, our community is warm and 
                  welcoming, and our mission is clear: to share the hope we&apos;ve found in Jesus with our city and beyond.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Today, we serve hundreds of families from diverse backgrounds, offering services in both English 
                  and Spanish, and providing ministries for every age and stage of life.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Nuestra Historia</h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Living Hope Church fue fundada en 2009 con una visión simple: ser un lugar donde todos puedan 
                  encontrar el amor de Dios y descubrir su propósito. Lo que comenzó como un pequeño grupo de 
                  familias se ha convertido en una comunidad de fe vibrante y multicultural.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Somos una iglesia pentecostal contemporánea que valora tanto el poder del Espíritu Santo como la 
                  profundidad de la enseñanza bíblica. Nuestra adoración es enérgica y auténtica, nuestra comunidad 
                  es cálida y acogedora, y nuestra misión es clara: compartir la esperanza que hemos encontrado en 
                  Jesús con nuestra ciudad y más allá.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Hoy servimos a cientos de familias de diversos orígenes, ofreciendo servicios en inglés y español, 
                  y brindando ministerios para cada edad y etapa de la vida.
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
