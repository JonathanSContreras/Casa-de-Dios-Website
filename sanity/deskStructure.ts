/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Bell, Users, Heart, HandHeart } from 'lucide-react'

/**
 * Custom Studio Structure
 *
 * Organizes content types into logical sections for easy navigation
 * by church staff. Content is grouped by function with clear visual hierarchy.
 */

export const structure = (S: any) =>
  S.list()
    .title('Content Management')
    .items([
      // CONTENT MANAGEMENT SECTION
      S.listItem()
        .title('📋 Content Management')
        .child(
          S.list()
            .title('Content Management')
            .items([
              // Events
              S.listItem()
                .title('Events')
                .icon(Calendar)
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .filter('_type == "event"')
                    .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
                ),

              // Announcements
              S.listItem()
                .title('Announcements')
                .icon(Bell)
                .child(
                  S.documentTypeList('announcement')
                    .title('Announcements')
                    .filter('_type == "announcement"')
                    .defaultOrdering([
                      { field: 'priority', direction: 'asc' },
                      { field: 'publishDate', direction: 'desc' },
                    ])
                ),
            ])
        ),

      // Divider
      S.divider(),

      // PEOPLE & GROUPS SECTION
      S.listItem()
        .title('👥 People & Groups')
        .child(
          S.list()
            .title('People & Groups')
            .items([
              // Leadership
              S.listItem()
                .title('Leadership')
                .icon(Users)
                .child(
                  S.documentTypeList('leadership')
                    .title('Leadership')
                    .filter('_type == "leadership"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),

              // Ministries
              S.listItem()
                .title('Ministries')
                .icon(Heart)
                .child(
                  S.documentTypeList('ministry')
                    .title('Ministries')
                    .filter('_type == "ministry"')
                    .defaultOrdering([
                      { field: 'isActive', direction: 'desc' },
                      { field: 'name', direction: 'asc' },
                    ])
                ),
            ])
        ),

      // Divider
      S.divider(),

      // COMMUNITY SECTION
      S.listItem()
        .title('🙏 Community')
        .child(
          S.list()
            .title('Community')
            .items([
              // Prayer Requests - all
              S.listItem()
                .title('All Prayer Requests')
                .icon(HandHeart)
                .child(
                  S.documentTypeList('prayerRequest')
                    .title('All Prayer Requests')
                    .filter('_type == "prayerRequest"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),

              // Quick filter for pending prayer requests
              S.listItem()
                .title('⏳ Pending Review')
                .icon(HandHeart)
                .child(
                  S.documentTypeList('prayerRequest')
                    .title('Pending Prayer Requests')
                    .filter('_type == "prayerRequest" && status == "pending"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
            ])
        ),
    ])
