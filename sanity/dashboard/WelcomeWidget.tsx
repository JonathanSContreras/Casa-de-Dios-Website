import React from 'react'
import { Card, Stack, Text, Heading } from '@sanity/ui'
import { Church } from 'lucide-react'

/**
 * Welcome Widget
 * Displays a warm welcome message for church staff
 */
export function WelcomeWidget() {
  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={3}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Church size={32} />
          <Heading size={2}>Welcome to Casa de Dios CMS</Heading>
        </div>
        <Text size={2}>
          Manage your church content with ease. Use the sidebar to navigate between
          events, announcements, leadership, ministries, and prayer requests.
        </Text>
        <Text size={1} muted>
          📋 Quick Tip: Check the "Pending Review" section for prayer requests that need approval
        </Text>
      </Stack>
    </Card>
  )
}
