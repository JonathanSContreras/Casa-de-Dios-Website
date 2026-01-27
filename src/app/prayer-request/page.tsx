// import PrayerForm from './PrayerForm'
// import ApprovedRequests from './ApprovedRequests'
// import { Suspense } from 'react'

// /**
//  * Prayer Request Page (Server Component)
//  *
//  * This page combines:
//  * 1. A client-side form for submitting prayer requests
//  * 2. A server-side component for displaying approved requests
//  *
//  * Workflow:
//  * - User submits request via form (client component)
//  * - Request is created as "pending" in Sanity
//  * - Church staff reviews and approves in Studio
//  * - Approved requests appear below (server component)
//  */

// export default function PrayerRequestPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Prayer Requests
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Submit your prayer request and let our community lift you up in
//             prayer. All requests are reviewed by our team before being shared.
//           </p>
//         </div>

//         {/* Prayer Request Form (Client Component) */}
//         <div className="mb-12">
//           <PrayerForm />
//         </div>

//         {/* Approved Prayer Requests (Server Component with Suspense) */}
//         {/* <Suspense
//           fallback={
//             <div className="bg-white rounded-lg shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Community Prayer Requests
//               </h2>
//               <div className="text-center py-12 text-gray-500">
//                 <p>Loading prayer requests...</p>
//               </div>
//             </div>
//           }
//         >
//           <ApprovedRequests />
//         </Suspense> */}

//         {/* Prayer Encouragement */}
//         <section className="mt-12 text-center">
//           <p className="text-gray-600 italic">
//             &quot;Do not be anxious about anything, but in every situation, by
//             prayer and petition, with thanksgiving, present your requests to
//             God.&quot; - Philippians 4:6
//           </p>
//         </section>
//       </div>
//     </div>
//   )
// }

'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

/**
 * Prayer Request Form Component (Client Component)
 *
 * This is the client-side form for submitting prayer requests.
 * Handles form validation, submission, and user feedback.
 */

interface FormData {
  name: string
  request: string
  contactEmail: string
}

interface FormErrors {
  request?: string
  contactEmail?: string
}

export default function PrayerRequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    isPrivate: false,
  });

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate request (required)
    if (!formData.request.trim()) {
      newErrors.request = 'Please enter your prayer request'
    } else if (formData.request.length > 500) {
      newErrors.request = 'Prayer request must be under 500 characters'
    }

    // Validate email format if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.contactEmail = 'Please enter a valid email address'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim() || undefined,
          request: formData.request.trim(),
          contactEmail: formData.email.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit prayer request')
      }

      // Success!
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', request: '', isPrivate: false })
      setErrors({})

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting prayer request:', error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit prayer request. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#1A5D5D] text-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Prayer Requests</h1>
          <h2 className="text-5xl lg:text-7xl font-bold mb-8">Peticiones de Oración</h2>
          <p className="text-xl lg:text-2xl max-w-3xl text-[#E5E5E5]">
            We believe in the power of prayer. Share your prayer request with our community and let us pray with you.
          </p>
        </div>
      </section>

      {/* Prayer Form Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Information */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">We&apos;re Here to Pray</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-[#4A4A4A] mb-8">Estamos Aquí para Orar</h3>

              <div className="space-y-6 mb-12">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Prayer is one of the most powerful gifts God has given us. At House of God, we take prayer 
                  seriously and consider it a privilege to pray for you and with you.
                </p>
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  La oración es uno de los regalos más poderosos que Dios nos ha dado. En Casa de Dios, 
                  tomamos la oración en serio y consideramos un privilegio orar por ti y contigo.
                </p>
              </div>

              <div className="bg-white p-10">
                <Heart size={48} className="text-[#1A5D5D] mb-6" />
                <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
                <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">Tu Privacidad Importa</h4>
                <p className="text-[#4A4A4A] mb-3">
                  All prayer requests are treated with confidentiality. You can choose to keep your request private 
                  or share it with our prayer team.
                </p>
                <p className="text-[#4A4A4A]">
                  Todas las peticiones de oración se tratan con confidencialidad. Puedes optar por mantener tu 
                  petición privada o compartirla con nuestro equipo de oración.
                </p>
              </div>
            </div>

            {/* Prayer Request Form */}
            <div className="bg-white p-8 lg:p-12">
              <h3 className="text-3xl font-bold mb-2">Submit a Prayer Request</h3>
              <p className="text-2xl font-bold text-[#4A4A4A] mb-8">Enviar una Petición de Oración</p>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 text-green-800">
                  <p className="font-bold">Prayer request submitted successfully!</p>
                  <p className="text-sm">¡Petición de oración enviada con éxito!</p>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-800">
                  <p className="font-bold">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    Name / Nombre (Optional / Opcional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Anonymous / Anónimo"
                    className="w-full px-4 py-3 border-2 border-[#E5E5E5] focus:border-[#1A5D5D] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    Email / Correo Electrónico (Optional / Opcional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border-2 ${
                      errors.contactEmail ? 'border-red-500' : 'border-[#E5E5E5]'
                    } focus:border-[#1A5D5D] focus:outline-none`}
                  />
                  {errors.contactEmail && (
                    <p className="text-sm text-red-600 mt-2">{errors.contactEmail}</p>
                  )}
                  {!errors.contactEmail && (
                    <p className="text-sm text-[#4A4A4A] mt-2">
                      We&apos;ll only use your email to follow up on your prayer request if needed.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="request" className="block text-sm font-bold mb-2">
                    Prayer Request / Petición de Oración *
                  </label>
                  <textarea
                    id="request"
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="Share your prayer request here... / Comparte tu petición de oración aquí..."
                    className={`w-full px-4 py-3 border-2 ${
                      errors.request ? 'border-red-500' : 'border-[#E5E5E5]'
                    } focus:border-[#1A5D5D] focus:outline-none resize-none`}
                  ></textarea>
                  {errors.request && (
                    <p className="text-sm text-red-600 mt-2">{errors.request}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 font-bold transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#1A5D5D] text-white hover:bg-[#154A4A]'
                  }`}
                >
                  {isSubmitting
                    ? 'Submitting... / Enviando...'
                    : 'Submit Prayer Request / Enviar Petición de Oración'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Join Us in Prayer</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-[#4A4A4A]">Únete a Nosotros en Oración</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="border-4 border-[#1A5D5D] p-10">
              <h3 className="text-2xl font-bold mb-2">Tuesday Night Prayer</h3>
              <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">Oración del Martes por la Noche</h4>
              <p className="text-lg text-[#4A4A4A] mb-2">8:00 PM - 10:00 PM</p>
              {/* <p className="text-lg text-[#4A4A4A] mb-4">Main Sanctuary / Santuario Principal</p> */}
              <p className="text-[#4A4A4A] mb-4">
                Mid-week prayer gathering with intercession and community support.
              </p>
              <p className="text-[#4A4A4A]">
                <i>
                  Reunión de oración a mitad de semana con intercesión y apoyo comunitario.
                </i>
              </p>
            </div>

            <div className="border-4 border-[#1A5D5D] p-10">
              <h3 className="text-2xl font-bold mb-2">Thursday Afternoon Prayer</h3>
              <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">Oración del Jueves por la Tarde</h4>
              <p className="text-lg text-[#4A4A4A] mb-2">9:00 AM - 12:00 PM</p>
              {/* <p className="text-lg text-[#4A4A4A] mb-4">Main Sanctuary / Santuario Principal</p> */}
              <p className="text-[#4A4A4A] mb-4">
                Women&apos;s prayer gathering for intercession and community support.
              </p>
              <p className="text-[#4A4A4A]">
                <i>
                  Encuentro de oración para mujeres con fines de intercesión y apoyo comunitario.
                </i>
              </p>
            </div>

            <div className="border-4 border-[#1A5D5D] p-10">
              <h3 className="text-2xl font-bold mb-2">24/7 Prayer Line</h3>
              <h4 className="text-xl font-bold text-[#4A4A4A] mb-4">Línea de Oración 24/7</h4>
              <p className="text-lg text-[#4A4A4A] mb-2">(512) 555-PRAY</p>
              {/* <p className="text-lg text-[#4A4A4A] mb-4">Available anytime</p> */}
              <p className="text-[#4A4A4A] mb-4">
                Call our prayer line anytime for immediate prayer support from our prayer team.
              </p>
              <p className="text-[#4A4A4A]">
                <i>
                  Llame a nuestra línea de oración en cualquier momento para recibir apoyo inmediato de nuestro equipo de oración.
                </i>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biblical Foundation */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="bg-white p-10">
              <p className="text-xl text-[#4A4A4A] italic mb-4">
                &quot;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, 
                present your requests to God. And the peace of God, which transcends all understanding, will guard 
                your hearts and your minds in Christ Jesus.&quot;
              </p>
              <p className="text-lg font-bold">Philippians 4:6-7</p>
            </div>
            <div className="bg-white p-10">
              <p className="text-xl text-[#4A4A4A] italic mb-4">
                &quot;No se inquieten por nada; más bien, en toda ocasión, con oración y ruego, presenten sus peticiones 
                a Dios y denle gracias. Y la paz de Dios, que sobrepasa todo entendimiento, cuidará sus corazones 
                y sus pensamientos en Cristo Jesús.&quot;
              </p>
              <p className="text-lg font-bold">Filipenses 4:6-7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
