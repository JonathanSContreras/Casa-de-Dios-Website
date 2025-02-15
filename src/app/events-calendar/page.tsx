import Header from "../header/page";

export default function EventsCalendar() {
  // Example event data
  const events = [
    {
      id: 1,
      title: "Sunday School",
      date: "February 17, 2025",
      time: "10:30 AM",
      location: "Main Sanctuary",
    },
    {
      id: 2,
      title: "Sunday Worship Service",
      date: "February 17, 2025",
      time: "12:00 PM",
      location: "Main Sanctuary",
    },
    {
      id: 3,
      title: "Prayer Service",
      date: "February 17, 2025",
      time: "8:00 PM",
      location: "Main Sanctuary",
    },
    {
        id: 4,
        title: "Service of Association",
        date: "February 17, 2025",
        time: "8:00 PM",
        location: "Main Sanctuary",
      },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8"> Events & Calendar </h1>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upcoming Events</h2>
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600"><strong>Date:</strong> {event.date}</p>
                <p className="text-gray-600"><strong>Time:</strong> {event.time}</p>
                <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calendar Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Event Calendar</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=casadediosaic%40gmail.com&ctz=America%2FChicago"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              className="w-full h-96"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}