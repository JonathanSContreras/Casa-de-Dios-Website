"use client";
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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Page Title */}
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Prayer Requests
        </h1>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-center leading-relaxed text-gray-600">
            We believe in the power of prayer. If you have a prayer request,
            please share it with us. Our community is here to pray for you and
            support you in your time of need.
          </p>
        </section>

        {/* Prayer Request Form */}
        <section className="rounded-lg bg-white p-8 shadow-md">
          {isSubmitted ? (
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                Thank You!
              </h2>
              <p className="text-gray-600">
                Your prayer request has been submitted. We will lift it up in
                prayer.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Prayer Request Field */}
              <div>
                <label
                  htmlFor="request"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Your Prayer Request
                </label>
                <textarea
                  id="request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  rows={5}
                  placeholder="Please share your prayer request..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
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
            Do not be anxious about anything, but in every situation, by prayer
            and petition, with thanksgiving, present your requests to God. -
            Philippians 4:6
          </p>
        </section>
      </div>
    </div>
  );
}
