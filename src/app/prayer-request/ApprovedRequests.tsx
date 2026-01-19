import { getApprovedPrayerRequests } from '@/lib/sanity/queries'
import { formatDistanceToNow } from 'date-fns'

/**
 * Approved Prayer Requests Component (Server Component)
 *
 * Fetches and displays approved prayer requests from Sanity.
 * This is a server component that runs on the server and is cached.
 *
 * Revalidation: Data is revalidated every 5 minutes (300 seconds)
 */

export const revalidate = 300 // Revalidate every 5 minutes

export default async function ApprovedRequests() {
  // Fetch approved prayer requests from Sanity
  const prayerRequests = await getApprovedPrayerRequests(20)

  // If no prayer requests, show a message
  if (!prayerRequests || prayerRequests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Community Prayer Requests
        </h2>
        <p className="text-gray-600 mb-4">
          Join us in praying for requests from our community.
        </p>
        <div className="text-center py-12 text-gray-500">
          <p>No prayer requests have been shared yet.</p>
          <p className="text-sm mt-2">
            Be the first to submit a prayer request above!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Community Prayer Requests
      </h2>
      <p className="text-gray-600 mb-8">
        Join us in praying for these requests from our community.
      </p>

      {/* Prayer Requests List */}
      <div className="space-y-6">
        {prayerRequests.map((request) => {
          // Format the date
          const submittedDate = new Date(request.submittedAt)
          const timeAgo = formatDistanceToNow(submittedDate, {
            addSuffix: true,
          })

          return (
            <div
              key={request._id}
              className="border-l-4 border-blue-500 bg-gray-50 p-6 rounded-r-lg hover:bg-blue-50 transition-colors"
            >
              {/* Header: Name and Date */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">
                  {request.name || 'Anonymous'}
                </h3>
                <span className="text-sm text-gray-500">{timeAgo}</span>
              </div>

              {/* Prayer Request Content */}
              <p className="text-gray-700 leading-relaxed">{request.request}</p>

              {/* Prayer Indicator */}
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <span className="mr-2">🙏</span>
                <span>Praying for this request</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Show a note if there are more requests */}
      {prayerRequests.length === 20 && (
        <p className="text-center text-gray-500 text-sm mt-8">
          Showing the 20 most recent prayer requests.
        </p>
      )}
    </div>
  )
}
