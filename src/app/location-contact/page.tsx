export default function LocationContact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Page Title */}
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Location & Contact
        </h1>

        {/* Address Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Our Location
          </h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            Join us at our church for worship, fellowship, and community events.
            We are located at:
          </p>
          <address className="text-gray-600 italic">
            13315 Veterans Memorial Drive, Suite 101
            <br />
            Houston, TX 77014
            <br />
            United States
          </address>
        </section>

        {/* Map Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Find Us on the Map
          </h2>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.935333333333!2d-95.4114206!3d29.7604267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b16d0dffad8b%3A0xda3f82f7b856a073!2s13315%20Veterans%20Memorial%20Dr%2C%20Houston%2C%20TX%2077014!5e0!3m2!1sen!2sus!4v1713299600000!5m2!1sen!2sus"
              title="Map showing the location of Casa de Dios church at 13315 Veterans Memorial Drive, Houston, TX"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="h-96 w-full"
            ></iframe>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Contact Us
          </h2>
          <p className="mb-4 leading-relaxed text-gray-600">
            We would love to hear from you! Reach out to us via phone, email, or
            the contact form below.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong>Phone:</strong> (281) 713-0681
            </li>
            <li>
              <strong>Email:</strong> casadediosaic@gmail.com
            </li>
            {/* <li><strong>Office Hours:</strong> Mon-Fri, 9 AM - 5 PM</li> */}
          </ul>
        </section>
      </div>
    </div>
  );
}
