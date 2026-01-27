import { getAllLeadersByMinistry } from '@/lib/sanity/queries';
import type { MinistryType } from '@/lib/sanity/types';
import { MinistrySection } from './_components/MinistrySection';

export default async function Ministries() {
  const leadersByMinistry = await getAllLeadersByMinistry();

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
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Ministries</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Ministerios</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            Discover ways to connect, grow, and serve through our various ministries at Living Hope Church.
          </p>
        </div>
      </section>

      {/* Ministries Section with Modal */}
      <MinistrySection ministries={ministries} />

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
              href="/contact"
              className="inline-block bg-[#1A5D5D] text-white px-12 py-5 font-bold text-lg hover:bg-[#154A4A] transition-colors"
            >
              Contact Us to Serve / Contáctanos para Servir
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
