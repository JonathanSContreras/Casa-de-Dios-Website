/**
 * Loading state for Sanity Studio
 */

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <p className="text-slate-600">Loading Sanity Studio...</p>
      </div>
    </div>
  )
}
