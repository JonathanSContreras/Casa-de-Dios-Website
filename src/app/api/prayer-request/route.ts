import { NextRequest, NextResponse } from 'next/server'
import { writeClient, isWriteClientConfigured } from '@/lib/sanity/client-write'

/**
 * Prayer Request Submission API Route
 *
 * This endpoint accepts POST requests to create new prayer request submissions.
 * All submissions start as "pending" and require staff approval before appearing publicly.
 *
 * Security:
 * - Only accepts POST requests
 * - Validates required fields
 * - Uses write token (server-side only)
 * - All submissions default to status="pending" and isPublic=false
 *
 * Request body:
 * {
 *   name?: string,         // Optional - for anonymous submissions
 *   request: string,       // Required - the prayer request content
 *   contactEmail?: string  // Optional - for follow-up
 * }
 */

interface PrayerRequestBody {
  name?: string
  request: string
  contactEmail?: string
}

/**
 * POST /api/prayer-request
 * Create a new prayer request submission
 */
export async function POST(request: NextRequest) {
  try {
    // Check if write client is configured
    if (!isWriteClientConfigured()) {
      console.error('SANITY_WRITE_TOKEN is not configured')
      return NextResponse.json(
        {
          error:
            'Prayer request service is not configured. Please contact the administrator.',
        },
        { status: 503 }
      )
    }

    // Parse request body
    const body: PrayerRequestBody = await request.json()

    // Validate required fields
    if (!body.request || body.request.trim() === '') {
      return NextResponse.json(
        { error: 'Prayer request content is required' },
        { status: 400 }
      )
    }

    // Validate request length
    if (body.request.length > 500) {
      return NextResponse.json(
        { error: 'Prayer request must be under 500 characters' },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (body.contactEmail && body.contactEmail.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.contactEmail)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    // Create prayer request document in Sanity
    const newPrayerRequest = await writeClient.create({
      _type: 'prayerRequest',
      name: body.name?.trim() || null,
      request: body.request.trim(),
      contactEmail: body.contactEmail?.trim() || null,
      submittedAt: new Date().toISOString(),
      status: 'pending', // All submissions start as pending
      isPublic: false, // Must be explicitly approved by staff
    })

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for your prayer request. Our team will review it shortly.',
        id: newPrayerRequest._id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error creating prayer request:', error)

    // Return generic error to client (don't expose internal details)
    return NextResponse.json(
      {
        error: 'Failed to submit prayer request. Please try again later.',
      },
      { status: 500 }
    )
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit prayer requests.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit prayer requests.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit prayer requests.' },
    { status: 405 }
  )
}
