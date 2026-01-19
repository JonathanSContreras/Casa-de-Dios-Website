import { Heart, Clock, MapPin, Mail, Users } from "lucide-react";
import Image from "next/image";
import { getActiveMinistries } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { MinistryWithLeader } from "@/lib/sanity/types";

// Revalidate every hour (ministries change infrequently)
export const revalidate = 3600;

export default async function MinistriesPage() {
  // Fetch active ministries from Sanity with populated leader data
  const ministries: MinistryWithLeader[] = await getActiveMinistries();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-6">Our Ministries</h1>
          <p className="text-xl text-blue-100">
            Discover the many ways you can serve, grow, and connect through our ministries.
          </p>
        </div>
      </section>

      {/* Ministries List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {ministries.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">
                Ministry information coming soon. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {ministries.map((ministry) => (
                <div
                  key={ministry._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-200"
                >
                  <div className="p-8">
                    {/* Ministry Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <Heart className="w-8 h-8 text-blue-600 flex-shrink-0" />
                          <h2 className="text-3xl font-serif text-slate-800">
                            {ministry.name}
                          </h2>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-4">
                          {ministry.description}
                        </p>

                        {/* Meeting Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {ministry.meetingTime && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span>{ministry.meetingTime}</span>
                            </div>
                          )}

                          {ministry.location && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span>{ministry.location}</span>
                            </div>
                          )}

                          {ministry.contactEmail && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className="w-4 h-4 text-blue-600" />
                              <a
                                href={`mailto:${ministry.contactEmail}`}
                                className="text-blue-600 hover:text-blue-700 hover:underline"
                              >
                                {ministry.contactEmail}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Leader Info */}
                      {ministry.leader && (
                        <div className="bg-slate-50 rounded-lg p-6 lg:w-80 flex-shrink-0">
                          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">
                            Ministry Leader
                          </h3>

                          <div className="flex items-center gap-4">
                            {/* Leader Photo */}
                            {ministry.leader.photo ? (
                              <Image
                                src={urlFor(ministry.leader.photo)
                                  .width(80)
                                  .height(80)
                                  .fit('crop')
                                  .url()}
                                width={64}
                                height={64}
                                alt={ministry.leader.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                                <Users className="w-8 h-8 text-blue-600" />
                              </div>
                            )}

                            {/* Leader Details */}
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">
                                {ministry.leader.name}
                              </p>
                              <p className="text-sm text-slate-600">
                                {ministry.leader.role}
                              </p>
                              {ministry.leader.email && (
                                <a
                                  href={`mailto:${ministry.leader.email}`}
                                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                  Contact
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Get Involved?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Every ministry needs passionate volunteers. Find your place and make an impact!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Us to Learn More
          </a>
        </div>
      </section>
    </div>
  );
}
