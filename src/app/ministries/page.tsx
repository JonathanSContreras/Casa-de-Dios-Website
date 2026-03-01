import Image from 'next/image';
import { getActiveMinistries } from '@/lib/sanity/queries';
import { MinistrySection } from './_components/MinistrySection';

// Revalidate this page every 5 minutes
export const revalidate = 300;

export default async function Ministries() {
  const sanityMinistries = await getActiveMinistries();

  // Map Sanity ministries to the format expected by MinistrySection
  // Each leader gets a displayRole: roleOverride if set, otherwise their default role
  const ministries = sanityMinistries.map((ministry) => ({
    id: ministry._id,
    slug: ministry.slug?.current || '',
    titleEn: ministry.name,
    titleEs: ministry.nameEs,
    shortDescEn: ministry.description?.substring(0, 100) + '...' || '',
    shortDescEs: ministry.descriptionEs?.substring(0, 100) + '...' || '',
    fullDescEn: ministry.description || '',
    fullDescEs: ministry.descriptionEs ?? '',
    leaders: (ministry.leaders ?? [])
      .filter((leader) => leader.person) // Filter out any null references
      .map((leader) => ({
        _id: leader.person._id,
        name: leader.person.name,
        displayRole: leader.roleOverride ?? leader.person.role ?? '',
        displayRoleEs: leader.roleOverrideEs ?? leader.person.roleEs ?? '',
        photo: leader.person.photo,
        email: leader.person.email,
      })),
  }));

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative bg-[#1A5D5D] text-white py-20 lg:py-32 overflow-hidden">
        {/* TODO: Replace src with ministries page hero background image */}
        <Image src="/images/group-picture.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1A5D5D]/85" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Ministries</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Ministerios</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            Discover ways to connect, grow, and serve through our various ministries at House of God Church.
          </p>
        </div>
      </section>

      {/* Ministries Section with Modal */}
      <MinistrySection ministries={ministries} />

      {/* Image break before Get Involved */}
      <section className="bg-[#F8F9FA]">
        <div className="max-w-[1440px] mx-auto">
          <Image
            src="/images/street-evangelism.jpg"
            alt="Community serving"
            className="w-full aspect-[21/9] lg:aspect-auto lg:h-[550px] object-cover"
            width={1920}
            height={550}
          />
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get Involved</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-[#4A4A4A] mb-8">Involúcrate</h3>
            <p className="text-xl text-[#4A4A4A] mb-4">
              Every ministry at House of God Church is built by volunteers who use their gifts to serve others. 
              There&apos;s a place for you to make a difference.
            </p>
            <p className="text-xl text-[#4A4A4A] mb-8">
              Cada ministerio en Iglesia Pentecostal Casa de Dios está construido por voluntarios que usan sus dones para servir a otros. 
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
