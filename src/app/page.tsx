import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, Users, Heart } from "lucide-react";

export default function HomePage() {
  const serviceTimes = [
    {
      name: "Sunday School",
      day: "Sunday",
      time: "10:30 AM",
      description: "Traditional Service",
    },
    {
      name: "Evangelistic Service",
      day: "Sunday",
      time: "12:00 PM",
      description: "Modern Worship",
    },
    {
      name: "Prayer Service",
      day: "Tuesday",
      time: "8:00 PM",
      description: "Midweek Fellowship",
    },
    {
      name: "Service per Association",
      day: "Friday",
      time: "8:00 PM",
      description: "Community Gathering",
    }
  ];

  const upcomingEvents = [
    {
      title: "Community Outreach",
      date: "December 15, 2024",
      description: "Join us as we serve our local community with food and fellowship.",
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Youth Christmas Play",
      date: "December 22, 2024",
      description: "Our youth group presents the nativity story in a beautiful performance.",
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "New Year Prayer Service",
      date: "December 31, 2024",
      description: "Welcome the new year with prayer, worship, and community.",
      icon: <Heart className="w-6 h-6 text-blue-600" />,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/group-picture.jpg"
            alt="Casa de Dios Group Picture"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Welcome Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            &quot;Come to me, all you who are weary and burdened, and I will give you rest.&quot; - Matthew 11:28
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              href={"/contact"}
            >
              Plan a Visit
            </Link>
            <Link 
              className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3"
              href={"/contact"}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Join Us for Worship</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Come as you are and experience the love of Christ in our welcoming community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {serviceTimes.map((service) => (
              <div className="text-center" key={service.name}>
                <div className="p-8">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">{service.name}</h3>
                  <p className="text-2xl font-serif text-blue-600 mb-2">{service.time}</p>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Upcoming Events</h2>
            <p className="text-xl text-slate-600">Don&apos;t miss these special gatherings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div className="p-6" key={event.title}>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{event.title}</h3>
                    <p className="text-slate-600 mb-2">{event.date}</p>
                    <p className="text-sm text-slate-500">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
              href={"/events"}
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-slate-800 mb-6">
                You Belong Here
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                At Grace Community Church, we believe that everyone has a place in God&apos;s family. 
                Whether you&apos;re seeking, questioning, or have been walking with Christ for years,
                we welcome you with open arms.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Our community is built on love, acceptance, and the transforming power of the Gospel. 
                Come discover how God wants to use your unique gifts and story for His glory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
                  href={"/about"}
                >
                  Learn More About Us
                </Link>
                <Link
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
                  href={"/contact"}
                >
                  Get Connected
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/group-picture.JPG"
                alt="Church community fellowship"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
