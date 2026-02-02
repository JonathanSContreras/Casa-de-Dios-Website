import React from 'react'
import { Card, Stack, Text, Heading, Button, Flex } from '@sanity/ui'
import { Calendar, Bell, HandHeart, Users, Heart } from 'lucide-react'

/**
 * Quick Links Widget
 * Provides shortcuts to common content management tasks
 */
export function QuickLinksWidget() {
  const quickLinks = [
    {
      label: 'New Event',
      icon: <Calendar size={16} />,
      href: '/intent/create/template=event',
    },
    {
      label: 'New Announcement',
      icon: <Bell size={16} />,
      href: '/intent/create/template=announcement',
    },
    {
      label: 'Review Prayers',
      icon: <HandHeart size={16} />,
      href: '/structure/prayerRequest',
    },
    {
      label: 'Manage Leadership',
      icon: <Users size={16} />,
      href: '/structure/leadership',
    },
    {
      label: 'Manage Ministries',
      icon: <Heart size={16} />,
      href: '/structure/ministry',
    },
  ]

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={2}>Quick Actions</Heading>

        <Flex gap={2} wrap="wrap">
          {quickLinks.map((link, index) => (
            <Button
              key={index}
              as="a"
              href={link.href}
              mode="ghost"
              tone="primary"
              icon={link.icon}
              text={link.label}
              style={{
                flex: '1 1 auto',
                minWidth: '140px',
              }}
            />
          ))}
        </Flex>
      </Stack>
    </Card>
  )
}
