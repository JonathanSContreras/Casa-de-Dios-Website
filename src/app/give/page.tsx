import { Heart, Smartphone, CreditCard, Building, HandHeart, Users, Globe, BookOpen } from "lucide-react";
import Image from "next/image";

export default function GivePage() {
  const givingMethods = [
    {
      id: 1,
      method: "CashApp",
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      details: "$IglesiaCasaDeDios",
      description: "Quick and easy mobile giving through CashApp.",
      instructions: "Send your gift to $IglesiaCasaDeDios with a note indicating your preferred designation."
    },
    {
      id: 2,
      method: "Zelle",
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      details: "(281) 713-0681",
      description: "Secure bank-to-bank transfer through Zelle.",
      instructions: "Use our church number as the recipient for your Zelle transfer."
    },
    // {
    //   id: 3,
    //   method: "Check",
    //   icon: <Building className="w-8 h-8 text-blue-600" />,
    //   details: "Mail to Church Office",
    //   description: "Traditional giving by check through mail or in-person.",
    //   instructions: "Make checks payable to 'Grace Community Church' and mail to 123 Faith Street, City, ST 12345"
    // },
    {
      id: 3,
      method: "In-Person",
      icon: <HandHeart className="w-8 h-8 text-blue-600" />,
      details: "During Services",
      description: "Give during our Sunday worship services.",
      instructions: "Offering boxes are available at the back of the sanctuary, or give during our offering time."
    }
  ];

  const givingAreas = [
    {
      title: "General Fund",
      description: "Supports the overall ministry and operations of the church including utilities and facility maintenance.",
      icon: <Building className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Missions",
      description: "Funds our local and global mission efforts, supporting missionaries and outreach programs.",
      icon: <Globe className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Building Fund",
      description: "Helps with facility improvements, maintenance, and future expansion projects.",
      icon: <Building className="w-8 h-8 text-blue-600" />
    },
    // {
    //   title: "Benevolence",
    //   description: "Assists church members and community members facing financial hardships.",
    //   icon: <Heart className="w-8 h-8 text-blue-600" />
    // },
    // {
    //   title: "Youth Ministry",
    //   description: "Supports programs, activities, and mission trips for our youth and young adults.",
    //   icon: <Users className="w-8 h-8 text-blue-600" />
    // },
    // {
    //   title: "Children's Ministry",
    //   description: "Funds Sunday school materials, VBS, and special programs for our children.",
    //   icon: <BookOpen className="w-8 h-8 text-blue-600" />
    // }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder-2.jpg"
            width={1920}
            height={1080}
            alt="Cross with sunlight"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-serif mb-6">Ways to Give</h1>
          <p className="text-xl text-blue-100 mb-8">
            &quot;Each of you should give what you have decided in your heart to give, 
            not reluctantly or under compulsion, for God loves a cheerful giver.&quot; - 2 Corinthians 9:7
          </p>
          <p className="text-lg text-slate-200">
            Your generous gifts help us fulfill our mission to share God&apos;s love in our community and beyond.
          </p>
        </div>
      </section>

      {/* Why We Give */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-slate-800 mb-6">Why We Give</h2>
              <p className="text-lg text-slate-600 mb-6">
                Giving is an act of worship and obedience to God. It&apos;s not about what the church
                needs from you, but about what God wants to do through you. When we give, we
                participate in God&apos;s work of transforming lives and communities.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Every gift, no matter the size, makes a difference. Your generosity helps us:
              </p>
              <ul className="text-slate-600 space-y-2 mb-8">
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Spread the Gospel through preaching and outreach</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Support families and individuals in our community</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Fund missions locally and around the world</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Provide excellent children&apos;s and youth programs</span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                src="/images/placeholder-1.jpg"
                alt="Community fellowship and giving"
                className="rounded-lg shadow-lg w-full h-auto"
                width={1920}
                height={1080}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">How to Give</h2>
            <p className="text-xl text-slate-600">
              We&apos;ve made it easy and convenient to give in the way that works best for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {givingMethods.map((method) => {
              return (
                <div key={method.id} className="hover:shadow-lg transition-shadow border-2 border-gray-100 rounded-lg bg-white">
                  <div className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium mb-2">{method.method}</h3>
                        <p className="text-blue-600 font-medium mb-3">{method.details}</p>
                        <p className="text-slate-600 mb-4">{method.description}</p>
                        <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                          <strong>Instructions:</strong> {method.instructions}
                        </p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                        {method.icon}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giving Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Where Your Gifts Go</h2>
            <p className="text-xl text-slate-600">
              You can designate your gifts to specific areas of ministry that are close to your heart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {givingAreas.map((area, index) => {
              return (
                <div key={index}>
                  <div className="p-6 text-center">
                    <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
                      {area.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-3">{area.title}</h3>
                    <p className="text-slate-600 text-sm">{area.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      {/* <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border-l-4 border-blue-600">
            <div className="p-8">
              <h3 className="text-xl font-medium mb-4 text-slate-800">Important Information</h3>
              <div className="space-y-4 text-slate-600">
                <p>
                  <strong>Tax Deductibility:</strong> Grace Community Church is a 501(c)(3) organization. 
                  All donations are tax-deductible to the full extent allowed by law. You will receive 
                  a giving statement for tax purposes at the end of each year.
                </p>
                <p>
                  <strong>Privacy & Security:</strong> Figma Make is not designed for collecting personally 
                  identifiable information (PII) or handling sensitive financial data. Please use our 
                  official church giving methods for all donations.
                </p>
                <p>
                  <strong>Questions?</strong> If you have questions about giving or need assistance with 
                  any of these methods, please contact our church office at (555) 123-4567 or 
                  giving@gracecommunitychurch.org.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      {/* <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Give?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Thank you for your heart to give and support God&apos;s work through Grace Community Church. 
            Your generosity makes a real difference in our community and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="p-4 bg-blue-500 rounded-lg">
              Contact Office for Assistance
            </div>
            <div className="border border-white text-white hover:bg-white hover:text-blue-600">
              Learn More About Stewardship
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}