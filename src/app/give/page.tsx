import { Heart, Users, Globe, Book } from 'lucide-react';
import Image from 'next/image';

export default function GivePage() {
  const givingOptions = [
    {
      id: 1,
      titleEn: 'CashApp',
      titleEs: '$IglesiaCasaDeDios',
      descEn: 'Send your offering quickly and securely through CashApp. Contact the church office for our CashApp tag.',
      descEs: 'Envía tu ofrenda de manera rápida y segura a través de CashApp. Contacta la oficina de la iglesia para nuestro tag de CashApp.',
    },
    {
      id: 2,
      titleEn: 'Zelle',
      titleEs: '(281) 713-0681',
      descEn: 'Give conveniently using Zelle through your bank app. Contact the church office for our Zelle information.',
      descEs: 'Da convenientemente usando Zelle a través de tu aplicación bancaria. Contacta la oficina de la iglesia para nuestra información de Zelle.',
    },
    {
      id: 3,
      titleEn: 'In-Person',
      titleEs: 'En Persona',
      descEn: 'Give during any service using offering boxes located throughout the sanctuary.',
      descEs: 'Da durante cualquier servicio usando las cajas de ofrendas ubicadas en el santuario.',
    },
    // {
    //   id: 4,
    //   titleEn: 'Bank Transfer',
    //   titleEs: 'Transferencia Bancaria',
    //   descEn: 'Set up direct bank transfers for one-time or recurring gifts. Contact us for account details.',
    //   descEs: 'Configura transferencias bancarias directas para ofrendas únicas o recurrentes. Contáctanos para los detalles de la cuenta.',
    // },
  ];

  const impactAreas = [
    {
      id: 1,
      icon: Heart,
      titleEn: 'Worship & Ministry',
      titleEs: 'Adoración y Ministerio',
      descEn: 'Supporting powerful worship experiences, biblical teaching, and pastoral care for our community.',
      descEs: 'Apoyando experiencias de adoración poderosas, enseñanza bíblica y cuidado pastoral para nuestra comunidad.',
    },
    {
      id: 2,
      icon: Users,
      titleEn: 'Community Outreach',
      titleEs: 'Alcance Comunitario',
      descEn: 'Serving our city through food banks, homeless ministry, and community support programs.',
      descEs: 'Sirviendo a nuestra ciudad a través de bancos de alimentos, ministerio para personas sin hogar y programas de apoyo comunitario.',
    },
    {
      id: 3,
      icon: Globe,
      titleEn: 'Global Missions',
      titleEs: 'Misiones Globales',
      descEn: 'Partnering with missionaries and churches around the world to share the gospel.',
      descEs: 'Asociándonos con misioneros e iglesias alrededor del mundo para compartir el evangelio.',
    },
    {
      id: 4,
      icon: Book,
      titleEn: 'Next Generation',
      titleEs: 'Próxima Generación',
      descEn: 'Investing in children and youth ministries to raise up future leaders of faith.',
      descEs: 'Invirtiendo en ministerios de niños y jóvenes para formar futuros líderes de fe.',
    },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative bg-[#1A5D5D] text-white py-20 lg:py-32 overflow-hidden">
        {/* TODO: Replace src with give page hero background image */}
        <Image src="/images/group-picture.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1A5D5D]/85" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Give</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Ofrendar</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            Your generosity makes ministry possible and transforms lives in our community and around the world.
          </p>
        </div>
      </section>

      {/* Why We Give Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Why We Give</h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Giving is an act of worship and obedience to God. The Bible teaches us that everything we have
                  comes from God, and giving is one way we express our gratitude and trust in His provision.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  When you give to House of God, you&apos;re investing in lives being changed, communities being
                  served, and the gospel being shared. Every dollar given goes directly toward fulfilling our mission
                  to share hope and transform lives.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  We believe in financial transparency and stewardship. Our leadership team ensures that every gift
                  is used wisely and effectively for God&apos;s kingdom work.
                </p>
              </div>
            </div>

            <div className="relative h-[350px] lg:h-[500px]">
              <Image
                src="/images/giving.jpg"
                alt="Picture showing people giving to the church and serving the community"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Por Qué Damos</h2>
              <div className="space-y-6">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Dar es un acto de adoración y obediencia a Dios. La Biblia nos enseña que todo lo que tenemos
                  viene de Dios, y dar es una forma de expresar nuestra gratitud y confianza en Su provisión.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Cuando das a Casa de Dios, estás invirtiendo en vidas que están siendo transformadas,
                  comunidades que están siendo servidas y el evangelio que está siendo compartido. Cada dólar dado
                  va directamente hacia el cumplimiento de nuestra misión de compartir esperanza y transformar vidas.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Creemos en la transparencia financiera y la mayordomía. Nuestro equipo de liderazgo asegura que
                  cada ofrenda se use sabia y efectivamente para la obra del reino de Dios.
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
            src="/images/evangelism-outreach.jpg"
            alt="Community meeting"
            className="w-full aspect-[21/9] lg:aspect-auto lg:h-[600px] object-cover"
            width={1920}
            height={1080}
          />
        </div>
      </section>

      {/* Your Impact Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Your Impact</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Tu Impacto</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {impactAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.id} className="bg-white p-10">
                  <Icon size={48} className="text-[#1A5D5D] mb-6" />
                  <h3 className="text-2xl font-bold mb-2">{area.titleEn}</h3>
                  <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">{area.titleEs}</h4>
                  <p className="text-lg text-[#4A4A4A] mb-3">{area.descEn}</p>
                  <p className="text-lg text-[#4A4A4A]">{area.descEs}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ways to Give Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Ways to Give</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Formas de Dar</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {givingOptions.map((option) => (
              <div key={option.id} className="border-4 border-[#1A5D5D] p-8">
                <h3 className="text-xl font-bold mb-2">{option.titleEn}</h3>
                <h4 className="text-lg font-bold text-[#4A4A4A] mb-4">{option.titleEs}</h4>
                <p className="text-[#4A4A4A] mb-2">{option.descEn}</p>
                <p className="text-[#4A4A4A]">{option.descEs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions About Giving Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="relative bg-[#1A5D5D] text-white p-12 lg:p-20 overflow-hidden">
            {/* TODO: Replace src with community/outreach background image */}
            {/* <Image src="/images/group-picture.jpg" alt="" fill className="object-cover" /> */}
            <div className="absolute inset-0 bg-[#1A5D5D]/85" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Questions About Giving?</h2>
              <h3 className="text-4xl lg:text-5xl font-bold mb-8">¿Preguntas Sobre las Ofrendas?</h3>
              <p className="text-xl mb-4 text-[#E5E5E5]">
                We&apos;re here to help! Whether you have questions about giving options, planned giving, or stewardship, our team is ready to assist you.
              </p>
              <p className="text-xl mb-12 text-[#E5E5E5]">
                ¡Estamos aquí para ayudar! Ya sea que tengas preguntas sobre opciones de donación, donaciones planificadas o mayordomía, nuestro equipo está listo para asistirte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-[#1A5D5D] px-12 py-5 font-bold text-lg hover:bg-[#F8F9FA] transition-colors inline-block"
                >
                  Contact Us / Contáctanos
                </a>
                <a
                  href="mailto:CasadeDios.AIC@gmail.com"
                  className="bg-transparent border-2 border-white text-white px-12 py-5 font-bold text-lg hover:bg-white/10 transition-colors inline-block"
                >
                  Email Us / Envíanos un Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image break before Biblical Foundation */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto">
          {/* TODO: Replace src with open Bible / prayer / quiet worship image */}
          {/* <Image
            src="/images/placeholder-2.jpg"
            alt="Biblical foundation"
            className="w-full h-[400px] lg:h-[500px] object-cover"
            width={1920}
            height={500}
          /> */}
        </div>
      </section>

      {/* Biblical Foundation Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Biblical Foundation</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Fundamento Bíblico</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white p-10">
              <p className="text-xl text-[#4A4A4A] italic mb-4">
                &quot;Each of you should give what you have decided in your heart to give, not reluctantly or under 
                compulsion, for God loves a cheerful giver.&quot;
              </p>
              <p className="text-lg font-bold">2 Corinthians 9:7</p>
            </div>
            <div className="bg-white p-10">
              <p className="text-xl text-[#4A4A4A] italic mb-4">
                &quot;Cada uno debe dar según lo que haya decidido en su corazón, no de mala gana ni por obligación, 
                porque Dios ama al que da con alegría.&quot;
              </p>
              <p className="text-lg font-bold">2 Corintios 9:7</p>
            </div>
            <div className="bg-white p-10">
              <p className="text-xl text-[#4A4A4A] italic mb-4">
                &quot;Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, 
                says the LORD Almighty, and see if I will not throw open the floodgates of heaven and pour out 
                so much blessing that there will not be room enough to store it.&quot;
              </p>
              <p className="text-lg font-bold">Malachi 3:10</p>
            </div>
            <div className="bg-white p-10">
              <p className="text-xl text-[#4A4A4A] italic mb-4">
                &quot;Traigan íntegro el diezmo para los fondos del templo, y así habrá alimento en mi casa. Pruébenme 
                en esto, dice el SEÑOR Todopoderoso, y vean si no abro las compuertas del cielo y derramo sobre 
                ustedes bendición hasta que sobreabunde.&quot;
              </p>
              <p className="text-lg font-bold">Malaquías 3:10</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}