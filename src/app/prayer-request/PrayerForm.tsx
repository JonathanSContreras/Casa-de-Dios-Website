'use client'

import { useState } from 'react'

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

export default function PrayerForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    request: '',
    contactEmail: '',
  })
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
    if (formData.contactEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.contactEmail)) {
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
          contactEmail: formData.contactEmail.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit prayer request')
      }

      // Success!
      setSubmitSuccess(true)
      setFormData({ name: '', request: '', contactEmail: '' })

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

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Submit a Prayer Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field (Optional) */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Name{' '}
            <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Leave blank for anonymous"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        {/* Prayer Request Field (Required) */}
        <div>
          <label
            htmlFor="request"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Prayer Request <span className="text-red-500">*</span>
          </label>
          <textarea
            id="request"
            value={formData.request}
            onChange={(e) =>
              setFormData({ ...formData, request: e.target.value })
            }
            placeholder="Share your prayer request here..."
            rows={6}
            maxLength={500}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.request ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
            required
          />
          <div className="flex justify-between items-center mt-2">
            {errors.request && (
              <p className="text-sm text-red-600">{errors.request}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.request.length}/500 characters
            </p>
          </div>
        </div>

        {/* Email Field (Optional) */}
        <div>
          <label
            htmlFor="contactEmail"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email{' '}
            <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            id="contactEmail"
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData({ ...formData, contactEmail: e.target.value })
            }
            placeholder="If you'd like us to follow up"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.contactEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-600 mt-2">{errors.contactEmail}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Your email will remain private and only be visible to church staff.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
        </button>
      </form>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            ✓ Thank you for your prayer request! Our team will review it
            shortly.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">✗ {submitError}</p>
        </div>
      )}
    </div>
  )
}
