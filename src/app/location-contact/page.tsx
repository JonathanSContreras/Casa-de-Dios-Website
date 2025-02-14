import Header from "../header/page";

export default function LocationContact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Location & Contact
        </h1>

        {/* Address Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Location</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Join us at our church for worship, fellowship, and community events. We are located at:
          </p>
          <address className="text-gray-600 italic">
            123 Grace Street<br />
            Cityville, ST 12345<br />
            United States
          </address>
        </section>

        {/* Map Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Find Us on the Map</h2>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.95373531531615!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f7c787!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1622549402991!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-96"
            ></iframe>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We'd love to hear from you! Reach out to us via phone, email, or the contact form below.
          </p>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Phone:</strong> (123) 456-7890</li>
            <li><strong>Email:</strong> info@gracecommunitychurch.com</li>
            <li><strong>Office Hours:</strong> Mon-Fri, 9 AM - 5 PM</li>
          </ul>
        </section>
      </div>
    </div>
  );
}