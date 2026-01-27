'use client';

import { useState } from 'react';
import { Users, X, Mail } from 'lucide-react';
import Image from 'next/image';
import type { Leadership, MinistryType } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/image';

interface Ministry {
  id: MinistryType;
  titleEn: string;
  titleEs: string;
  shortDescEn: string;
  shortDescEs: string;
  fullDescEn: string;
  fullDescEs: string;
  leaders: Leadership[];
}

interface MinistrySectionProps {
  ministries: Ministry[];
}

export function MinistrySection({ ministries }: MinistrySectionProps) {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  return (
    <>
      {/* Ministries Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Ministries</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Ministerios</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {ministries.map((ministry) => (
              <div key={String(ministry.id)} className="p-8 border-4 border-[#1A5D5D]">
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

      {/* Ministry Modal */}
      {selectedMinistry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black-20 bg-opacity-50 backdrop-blur-md"
          onClick={() => setSelectedMinistry(null)}
        >
          <div
            className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1A5D5D] text-white p-6 lg:p-8 flex justify-between items-start z-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">{selectedMinistry.titleEn}</h2>
                <h3 className="text-2xl lg:text-3xl font-bold">{selectedMinistry.titleEs}</h3>
              </div>
              <button
                onClick={() => setSelectedMinistry(null)}
                className="text-white hover:text-[#E5E5E5] transition-colors flex-shrink-0 ml-4"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 lg:p-12">
              {/* Ministry Description */}
              <div className="space-y-6 mb-12">
                <div>
                  <h4 className="text-2xl font-bold mb-4">About This Ministry</h4>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed">{selectedMinistry.fullDescEn}</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">Acerca de Este Ministerio</h4>
                  <p className="text-lg text-[#4A4A4A] leading-relaxed">{selectedMinistry.fullDescEs}</p>
                </div>
              </div>

              {/* Leadership Team */}
              {selectedMinistry.leaders.length > 0 && (
                <div className="bg-[#F8F9FA] p-8 lg:p-10">
                  <h4 className="text-2xl lg:text-3xl font-bold mb-8">
                    Leadership Team / Equipo de Liderazgo
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selectedMinistry.leaders.map((leader) => (
                      <div key={leader._id} className="bg-white p-6">
                        {leader.photo ? (
                          <Image
                            src={urlFor(leader.photo).width(400).height(400).fit('crop').url()}
                            alt={leader.name}
                            className="w-full h-48 object-cover mb-4"
                            width={400}
                            height={300}
                          />
                        ) : (
                          <div className="w-full h-48 bg-[#1A5D5D] flex items-center justify-center mb-4">
                            <Users size={64} className="text-white opacity-50" />
                          </div>
                        )}
                        <h5 className="text-lg font-bold mb-1">{leader.name}</h5>
                        <p className="text-sm text-[#4A4A4A] mb-4">{leader.role}</p>
                        {leader.email && (
                          <a
                            href={`mailto:${leader.email}`}
                            className="flex items-center gap-2 text-[#1A5D5D] hover:text-[#154A4A] transition-colors"
                          >
                            <Mail size={16} />
                            <span className="text-sm break-all">{leader.email}</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Leaders Message */}
              {selectedMinistry.leaders.length === 0 && (
                <div className="bg-[#F8F9FA] p-8 lg:p-10 text-center">
                  <h4 className="text-2xl font-bold mb-4">Leadership Team / Equipo de Liderazgo</h4>
                  <p className="text-lg text-[#4A4A4A]">
                    Leadership information coming soon. / Información de liderazgo próximamente.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
