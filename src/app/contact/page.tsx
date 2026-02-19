'use client';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    language: 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! This is a demo - no data is actually sent.');
    setFormData({ name: '', email: '', phone: '', message: '', language: 'en' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#1A5D5D] text-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Contact Us</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Contáctanos</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            We&apos;d love to hear from you. Whether you&apos;re visiting for the first time or have questions, we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Service Times Section */}
      {/* <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Service Times</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Horarios de Servicio</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-8">
              <div className="bg-[#F8F9FA] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock size={32} className="text-[#1A5D5D]" />
                  <h3 className="text-2xl font-bold">Sunday Service</h3>
                </div>
                <p className="text-xl text-[#4A4A4A] mb-2">10:30 AM - Sunday School / Escuela Dominical</p>
                <p className="text-xl text-[#4A4A4A]">12:00 PM - Evangelistic Serice / Servicio Evangelístico</p>
              </div>

              <div className="bg-[#F8F9FA] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock size={32} className="text-[#1A5D5D]" />
                  <h3 className="text-2xl font-bold">Wednesday Prayer</h3>
                </div>
                <p className="text-xl text-[#4A4A4A]">7:00 PM - Bilingual Service</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#F8F9FA] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock size={32} className="text-[#1A5D5D]" />
                  <h3 className="text-2xl font-bold">Adoración Dominical</h3>
                </div>
                <p className="text-xl text-[#4A4A4A] mb-2">9:00 AM - Servicio en Inglés</p>
                <p className="text-xl text-[#4A4A4A]">11:00 AM - Servicio Bilingüe</p>
              </div>

              <div className="bg-[#F8F9FA] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Clock size={32} className="text-[#1A5D5D]" />
                  <h3 className="text-2xl font-bold">Oración del Miércoles</h3>
                </div>
                <p className="text-xl text-[#4A4A4A]">7:00 PM - Servicio Bilingüe</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Info & Form Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Get in Touch</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#4A4A4A] mb-12">Ponte en Contacto</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <MapPin size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Address / Dirección</h4>
                    <p className="text-lg text-[#4A4A4A]">
                      13315 Veterans Memorial Dr #102<br />
                      Houston, TX 77014<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Phone size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Phone / Teléfono</h4>
                    <p className="text-lg text-[#4A4A4A]">
                      (281) 713-0681<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1A5D5D] w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Mail size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Email / Correo Electrónico</h4>
                    <p className="text-lg text-[#4A4A4A]">
                      CasadeDios.AIC@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-2">Send Us a Message</h3>
              <p className="text-2xl font-bold text-[#4A4A4A] mb-8">Envíanos un Mensaje</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    Name / Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5E5] focus:border-[#1A5D5D] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    Email / Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#E5E5E5] focus:border-[#1A5D5D] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">
                    Phone / Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#E5E5E5] focus:border-[#1A5D5D] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-bold mb-2">
                    Preferred Language / Idioma Preferido
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#E5E5E5] focus:border-[#1A5D5D] focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">
                    Message / Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-[#E5E5E5] focus:border-[#1A5D5D] focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A5D5D] text-white px-8 py-4 font-bold hover:bg-[#154A4A] transition-colors"
                >
                  Send Message / Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-[#E5E5E5] w-full h-[400px] lg:h-[600px] flex items-center justify-center">
            <div className="text-center w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d302.823875821002!2d-95.49296603284434!3d29.979926793306603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640cc6c0e22ee63%3A0x9f051e4352c41524!2s13325%20Veterans%20Memorial%20Dr%2C%20Houston%2C%20TX%2077014!5e0!3m2!1sen!2sus!4v1768930129531!5m2!1sen!2sus"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map showing the location of House of God, 13325 Veterans Memorial Dr, Houston, TX 77014"
              />
            </div>
          </div>
        </div>
      </section>

      {/* First Time Visitor Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="bg-[#1A5D5D] text-white p-12 lg:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">First Time Visitor?</h2>
              <h3 className="text-4xl lg:text-5xl font-bold mb-8">¿Primera Vez?</h3>
              <p className="text-xl mb-4 text-[#E5E5E5]">
                We know visiting a new church can feel overwhelming. Here&apos;s what to expect when you visit House of God.
              </p>
              <p className="text-xl mb-8 text-[#E5E5E5]">
                Sabemos que visitar una iglesia nueva puede ser abrumador. Aquí está lo que puedes esperar cuando visites House of God.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <div>
                  <h4 className="text-xl font-bold mb-3">Parking / Estacionamiento</h4>
                  <p className="text-[#E5E5E5]">Free parking available in our main lot and street parking nearby.</p>
                  <p className="text-[#E5E5E5] pt-8">Estacionamiento gratuito disponible en nuestro lote principal y estacionamiento en la calle cercano.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Dress Code / Código de Vestimenta</h4>
                  <p className="text-[#E5E5E5]">Come as you are! We welcome casual or formal attire.</p>
                  <p className="text-[#E5E5E5] pt-8">¡Ven tal como eres! Aceptamos vestimenta informal o formal.</p>
                </div>
                {/* <div>
                  <h4 className="text-xl font-bold mb-3">Kids / Niños</h4>
                  <p className="text-[#E5E5E5]">Safe, engaging programs for all ages during services.</p>
                </div> */}
                <div>
                  <h4 className="text-xl font-bold mb-3">Worship / Adoración</h4>
                  <p className="text-[#E5E5E5]">Contemporary worship with modern music that moves your heart and honors God.</p>
                  <p className="text-[#E5E5E5] pt-8">Adoración contemporánea con música moderna que mueve tu corazón y honra a Dios.</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3">Translation / Traducción</h4>
                  <p className="text-[#E5E5E5]">We offer translation services in Spanish and English to help you connect with God.</p>
                  <p className="text-[#E5E5E5] pt-8">Ofrecemos servicios de traducción en español e inglés para ayudarte a conectarte con Dios.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
