import PrayerForm from './PrayerForm'
import ApprovedRequests from './ApprovedRequests'
import { Suspense } from 'react'

/**
 * Prayer Request Page (Server Component)
 *
 * This page combines:
 * 1. A client-side form for submitting prayer requests
 * 2. A server-side component for displaying approved requests
 *
 * Workflow:
 * - User submits request via form (client component)
 * - Request is created as "pending" in Sanity
 * - Church staff reviews and approves in Studio
 * - Approved requests appear below (server component)
 */

export default function PrayerRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prayer Requests
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your prayer request and let our community lift you up in
            prayer. All requests are reviewed by our team before being shared.
          </p>
        </div>

        {/* Prayer Request Form (Client Component) */}
        <div className="mb-12">
          <PrayerForm />
        </div>

        {/* Approved Prayer Requests (Server Component with Suspense) */}
        <Suspense
          fallback={
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Community Prayer Requests
              </h2>
              <div className="text-center py-12 text-gray-500">
                <p>Loading prayer requests...</p>
              </div>
            </div>
          }
        >
          <ApprovedRequests />
        </Suspense>

        {/* Prayer Encouragement */}
        <section className="mt-12 text-center">
          <p className="text-gray-600 italic">
            &quot;Do not be anxious about anything, but in every situation, by
            prayer and petition, with thanksgiving, present your requests to
            God.&quot; - Philippians 4:6
          </p>
        </section>
      </div>
    </div>
  )
}
