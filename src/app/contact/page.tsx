'use client';

import { Phone, MapPin, Mail, Clock, Calendar, Users, Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    requestType: "general"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      requestType: "general"
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      label: "Phone",
      value: "(555) 123-4567",
      description: "Call us during office hours"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      label: "Email",
      value: "info@gracecommunitychurch.org",
      description: "We typically respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      label: "Address",
      value: "123 Faith Street, City, ST 12345",
      description: "Visit us anytime during service hours"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      label: "Office Hours",
      value: "Monday - Friday: 9 AM - 5 PM",
      description: "Closed on weekends and holidays"
    }
  ];

  const serviceTimes = [
    {
      day: "Sunday",
      services: [
        { time: "9:00 AM", service: "Traditional Worship" },
        { time: "10:15 AM", service: "Sunday School" },
        { time: "11:00 AM", service: "Contemporary Worship" },
        { time: "6:00 PM", service: "Evening Service" }
      ]
    },
    {
      day: "Wednesday",
      services: [
        { time: "7:00 PM", service: "Prayer Meeting & Bible Study" }
      ]
    },
    {
      day: "Friday",
      services: [
        { time: "6:30 PM", service: "Youth Group" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-800">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder-1.jpg"
            width={1920}
            height={1080}
            alt="Grace Community Church building"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-serif mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100">
            We&apos;d love to hear from you! Whether you have questions, need prayer, 
            or want to get involved, we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif text-slate-800 mb-6">Send Us a Message</h2>
              <div>
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name">Full Name *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email">Email Address *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="requestType">Request Type</label>
                        <select
                          id="requestType"
                          name="requestType"
                          value={formData.requestType}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="general">General Question</option>
                          <option value="prayer">Prayer Request</option>
                          <option value="visit">Plan a Visit</option>
                          <option value="ministry">Ministry Information</option>
                          <option value="pastoral">Pastoral Care</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Please share your message, questions, or prayer requests..."
                      />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-2">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif text-slate-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  return (
                    <div key={index}>
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">{info.label}</h3>
                            <p className="text-slate-800 mb-1">{info.value}</p>
                            <p className="text-slate-500 text-sm">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Service Times</h2>
            <p className="text-xl text-slate-600">
              Join us for worship, fellowship, and spiritual growth throughout the week.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTimes.map((day) => (
              <div key={day.day}>
                <div className="p-8 text-center">
                  <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-6 text-blue-600">{day.day}</h3>
                  <div className="space-y-4">
                    {day.services.map((service, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4 text-left">
                        <p className="font-medium text-blue-600">{service.time}</p>
                        <p className="text-slate-600">{service.service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-800 mb-4">Find Us</h2>
            <p className="text-xl text-slate-600">
              We&apos;re located in the heart of our community and easy to find.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div>
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg mb-2">Address</h3>
                        <p className="text-slate-600">123 Faith Street</p>
                        <p className="text-slate-600">City, ST 12345</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg mb-2">Parking</h3>
                        <p className="text-slate-600">
                          Free parking is available in our church lot and on surrounding streets. 
                          Handicap accessible parking is available near the main entrance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Heart className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg mb-2">First Time Visitors</h3>
                        <p className="text-slate-600">
                          Look for our welcome team at the main entrance. They&apos;ll be happy to 
                          help you find your way and answer any questions you might have.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              {/* Embedded Map Placeholder */}
              <div>
                <div className="p-0">
                  <div className="bg-slate-200 h-96 flex items-center justify-center rounded-lg">
                    <div className="text-center text-slate-500">
                      <MapPin className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">
                        Google Maps integration would be embedded here
                      </p>
                      <button className="mt-4">
                        Open in Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Visit?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We can&apos;t wait to meet you and welcome you into our church family. 
            Come as you are - you belong here!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button>
              Plan Your First Visit
            </button>
            <button className="border-white text-white hover:bg-white hover:text-blue-600">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}