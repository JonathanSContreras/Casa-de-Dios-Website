import React, { useEffect, useState } from 'react'
import { Card, Stack, Text, Heading, Flex, Box } from '@sanity/ui'
import { useClient } from 'sanity'
import { Calendar, Bell, HandHeart } from 'lucide-react'

/**
 * Stats Widget
 * Displays quick statistics about content that needs attention
 */
export function StatsWidget() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [stats, setStats] = useState({
    pendingPrayers: 0,
    upcomingEvents: 0,
    activeAnnouncements: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get pending prayer requests count
        const pendingPrayers = await client.fetch<number>(
          `count(*[_type == "prayerRequest" && status == "pending"])`
        )

        // Get upcoming events count (events with future start dates)
        const upcomingEvents = await client.fetch<number>(
          `count(*[_type == "event" && startDate > now()])`
        )

        // Get active announcements count (not expired)
        const activeAnnouncements = await client.fetch<number>(
          `count(*[_type == "announcement" && (expirationDate > now() || !defined(expirationDate))])`
        )

        setStats({
          pendingPrayers,
          upcomingEvents,
          activeAnnouncements,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [client])

  const statItems = [
    {
      icon: <HandHeart size={24} />,
      label: 'Pending Prayer Requests',
      value: stats.pendingPrayers,
      tone: stats.pendingPrayers > 0 ? 'caution' : 'positive',
    },
    {
      icon: <Calendar size={24} />,
      label: 'Upcoming Events',
      value: stats.upcomingEvents,
      tone: 'default',
    },
    {
      icon: <Bell size={24} />,
      label: 'Active Announcements',
      value: stats.activeAnnouncements,
      tone: 'default',
    },
  ]

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Heading size={2}>Quick Stats</Heading>

        {loading ? (
          <Text muted>Loading stats...</Text>
        ) : (
          <Flex gap={3} wrap="wrap">
            {statItems.map((stat, index) => (
              <Box
                key={index}
                flex={1}
                style={{
                  minWidth: '180px',
                }}
              >
                <Card
                  padding={3}
                  radius={2}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tone={stat.tone as any}
                  border
                >
                  <Stack space={2}>
                    <div style={{ opacity: 0.7 }}>{stat.icon}</div>
                    <Text size={4} weight="bold">
                      {stat.value}
                    </Text>
                    <Text size={1} muted>
                      {stat.label}
                    </Text>
                  </Stack>
                </Card>
              </Box>
            ))}
          </Flex>
        )}
      </Stack>
    </Card>
  )
}
