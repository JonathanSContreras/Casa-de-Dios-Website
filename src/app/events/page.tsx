import { Calendar, Clock, MapPin, Users, Music, Heart, BookOpen, Gift } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Outreach",
      date: "December 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Downtown Community Center",
      description: "Join us as we serve our local community with food, clothing, and fellowship. Everyone is welcome to participate in this ministry of love.",
      icon: <Heart className="w-8 h-8 text-blue-600"/>,
      category: "Outreach"
    },
    {
      id: 2,
      title: "Youth Christmas Play",
      date: "December 22, 2024",
      time: "6:00 PM",
      location: "Main Sanctuary",
      description: "Our youth group presents 'The Light of the World' - a beautiful retelling of the nativity story with music and drama.",
      icon: <Music className="w-8 h-8 text-blue-600"/>,
      category: "Youth"
    },
    {
      id: 3,
      title: "Christmas Eve Service",
      date: "December 24, 2024",
      time: "7:00 PM",
      location: "Main Sanctuary",
      description: "Celebrate the birth of our Savior with special music, candlelight, and communion. This is a wonderful service for the whole family.",
      icon: <Gift className="w-8 h-8 text-blue-600"/>,
      category: "Worship"
    },
    {
      id: 4,
      title: "New Year Prayer Service",
      date: "December 31, 2024",
      time: "10:00 PM - 12:30 AM",
      location: "Main Sanctuary",
      description: "Welcome the new year with prayer, worship, and seeking God's blessing for the year ahead. Light refreshments will be served.",
      icon: <BookOpen className="w-8 h-8 text-blue-600"/>,
      category: "Prayer"
    },
    {
      id: 5,
      title: "Men's Breakfast",
      date: "January 6, 2025",
      time: "8:00 AM - 10:00 AM",
      location: "Fellowship Hall",
      description: "Monthly men's breakfast with fellowship, devotion, and planning for upcoming ministry opportunities.",
      icon: <Users className="w-8 h-8 text-blue-600"/>,
      category: "Fellowship"
    },
    {
      id: 6,
      title: "Women's Bible Study",
      date: "January 8, 2025",
      time: "7:00 PM - 8:30 PM",
      location: "Conference Room",
      description: "Starting a new study on the book of Philippians. All women are invited to join us for study, prayer, and fellowship.",
      icon: <BookOpen className="w-8 h-8 text-blue-600"/>,
      category: "Bible Study"
    }
  ];

  const regularSchedule = [
    {
      day: "Sunday",
      events: [
        { time: "10:30 AM", title: "Sunday School", location: "Main Sanctuary" },
        { time: "12:00 PM", title: "Evangelistical Service", location: "Main Sanctuary" },
      ]
    },
    {
      day: "Tuesday",
      events: [
        { time: "7:00 PM", title: "Prayer Service", location: "Main Sanctuary" },
      ]
    },
    {
      day: "Thursday",
      events: [
        { time: "9:00 PM", title: "Prayer", location: "Main Sanctuary" }
      ]
    },
    {
      day: "Friday",
      events: [
        { time: "8:00 PM", title: "Service per Associacion", location: "Main Sanctuary" },
      ]
    },
    // {
    //   day: "Saturday",
    //   events: [
    //     { time: "9:00 AM", title: "Men's Prayer Breakfast (1st Sat)", location: "Fellowship Hall" },
    //     { time: "10:00 AM", title: "Women's Ministry (2nd Sat)", location: "Conference Room" }
    //   ]
    // }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-serif mb-6">Church Events & Schedule</h1>
          <p className="text-xl text-blue-100">
            Stay connected with all the ways you can grow, serve, and fellowship with our church family.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Upcoming Special Events</h2>
            <p className="text-xl text-slate-600">
              Don&apos;t miss these special gatherings and ministry opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => {
              return (
                <div key={event.id} className="hover:shadow-lg transition-shadow border-2 border-gray-100 rounded-lg">
                  <div className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-medium mb-3">{event.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 mb-4">{event.description}</p>

                        <Link href={`/events/${event.id}`} className="text-blue-600 hover:underline font-medium">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regular Schedule */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Regular Weekly Schedule</h2>
            <p className="text-xl text-slate-600">
              Join us every week for worship, study, and fellowship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regularSchedule.map((day) => (
              <div key={day.day}>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-center mb-6 text-blue-600">
                    {day.day}
                  </h3>
                  <div className="space-y-4">
                    {day.events.map((event, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <p className="text-sm text-blue-600 font-medium">{event.time}</p>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-slate-500">{event.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Get Involved?</h2>
          <p className="text-xl text-blue-100 mb-8">
            There are many ways to connect and grow in our church family. 
            We&apos;d love to help you find your place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              Contact Our Office
            </Link>
            <Link href="/contact" className="border-white text-white hover:bg-white hover:text-blue-600">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}