import { Metadata } from 'next'
import Dashboard from '@/components/dashboard/Dashboard'

export const metadata: Metadata = {
  title: 'Secretary Dashboard',
  description: 'School Management System - Secretary Dashboard',
}

export default function DashboardPage() {
  return <Dashboard />
}

