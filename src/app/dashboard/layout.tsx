import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { LeftSidebar } from '@/components/LeftSideBar'
// import { RightSidebar } from '@/components/RightSideBar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GTIC Management Dashboard',
  description: 'A Dashboard for school management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden w-full">
            <LeftSidebar />
            <div className="flex-1 overflow-y-auto w-full">{children}</div>
            {/* <RightSidebar/> */}
          </div>

        </SidebarProvider>
        <Toaster />
      </div>
    
  )
}

