import React from 'react'
import { Stack } from '@sanity/ui'
import { WelcomeWidget } from './WelcomeWidget'
import { StatsWidget } from './StatsWidget'
import { QuickLinksWidget } from './QuickLinksWidget'

/**
 * Custom Dashboard
 * Main dashboard layout combining all widgets
 */
export function Dashboard() {
  return (
    <Stack space={4} padding={4}>
      <WelcomeWidget />
      <StatsWidget />
      <QuickLinksWidget />
    </Stack>
  )
}
