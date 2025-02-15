"use client";
import Header from "../header/page";
import { useState } from "react";

export default function PrayerRequest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission (you can replace this with an API call)
    console.log({ name, email, request });
    setIsSubmitted(true);
    setName("");
    setEmail("");
    setRequest("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Prayer Requests
        </h1>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            We believe in the power of prayer. If you have a prayer request, please share it with us.
            Our community is here to pray for you and support you in your time of need.
          </p>
        </section>

        {/* Prayer Request Form */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          {isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Thank You!
              </h2>
              <p className="text-gray-600">
                Your prayer request has been submitted. We will lift it up in prayer.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Prayer Request Field */}
              <div>
                <label htmlFor="request" className="block text-gray-700 font-medium mb-2">
                  Your Prayer Request
                </label>
                <textarea
                  id="request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Please share your prayer request..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Prayer Request
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Prayer Encouragement */}
        <section className="mt-12 text-center">
          <p className="text-gray-600 italic">
            "Do not be anxious about anything, but in every situation, by prayer and petition,
            with thanksgiving, present your requests to God." - Philippians 4:6
          </p>
        </section>
      </div>
    </div>
  );
}