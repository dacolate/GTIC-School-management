"use client"

// import { Home, Users, DollarSign, BookOpen, Calendar } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import Link from 'next/link'
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
// //   SidebarTrigger,
// } from '@/components/ui/sidebar'
import { PendingTasks } from './dashboard/PendingTasks'
import { QuickActions } from './dashboard/QuickActions'


export function RightSidebar() {

  return (
    
        <div>
          <PendingTasks />
          <QuickActions />
        </div>
       
  )
}

