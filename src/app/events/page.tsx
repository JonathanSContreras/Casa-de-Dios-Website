import { Calendar, Clock, MapPin, Users, Music, Heart, BookOpen, Gift } from "lucide-react";
import Link from "next/link";
import { getUpcomingEvents } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Event } from "@/lib/sanity/types";

// Helper function to get icon based on category
function getCategoryIcon(category: string) {
  const iconClass = "w-8 h-8 text-blue-600";
  switch (category) {
    case "Outreach":
      return <Heart className={iconClass} />;
    case "Youth":
      return <Music className={iconClass} />;
    case "Worship":
      return <Gift className={iconClass} />;
    case "Prayer":
      return <BookOpen className={iconClass} />;
    case "Fellowship":
      return <Users className={iconClass} />;
    case "Bible Study":
      return <BookOpen className={iconClass} />;
    default:
      return <Calendar className={iconClass} />;
  }
}

// Helper to format date and time
function formatEventDateTime(event: Event) {
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const dateStr = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const startTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const timeStr = endDate
    ? `${startTime} - ${endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`
    : startTime;

  return { date: dateStr, time: timeStr };
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EventsPage() {
  // Fetch events from Sanity
  // TEMPORARY: Using getAllEvents() to show all events regardless of date
  // Change back to getUpcomingEvents() once you update event dates to 2026
  const sanityEvents: Event[] = await getUpcomingEvents();

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
            {sanityEvents.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-slate-600 text-lg">
                  No upcoming events at this time. Check back soon!
                </p>
              </div>
            ) : (
              sanityEvents.map((event: Event) => {
                const { date, time } = formatEventDateTime(event);
                return (
                  <div key={event._id} className="hover:shadow-lg transition-shadow border-2 border-gray-100 rounded-lg overflow-hidden">
                    {/* Featured Image */}
                    {event.featuredImage && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={urlFor(event.featuredImage).width(800).height(400).fit('crop').url()}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                          {getCategoryIcon(event.category)}
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
                              <span>{date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Clock className="w-4 h-4" />
                              <span>{time}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-slate-600">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-slate-600 mb-4">{event.description}</p>

                          {event.registrationLink && (
                            <a
                              href={event.registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              Register Now →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
                  <h3 className="text-xl font-medium text-left mb-6 text-blue-600">
                    {day.day}
                  </h3>
                  <div className="space-y-4">
                    {day.events.map((event, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <p className="text-sm text-blue-600 font-medium">{event.time}</p>
                        <p className="font-medium">{event.title}</p>
                        {/* <p className="text-sm text-slate-500">{event.location}</p> */}
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