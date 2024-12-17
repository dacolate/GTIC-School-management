"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserPlus, DollarSign, FileText, Users, Bell } from 'lucide-react'
import { NewStudentForm } from '../forms/NewStudentForm'
import { RecordPaymentForm } from '../forms/RecordPaymentForm'
import { InvoicesList } from '../InvoicesList'
import { CreateClassForm } from '../forms/CreateClassForm'


const quickActions = [
  { icon: UserPlus, label: 'New Student', action: 'new-student' },
  { icon: DollarSign, label: 'Record Payment', action: 'record-payment' },
  { icon: FileText, label: 'Invoices', action: 'invoices' },
  { icon: Users, label: 'Create Class', action: 'create-class' },
  { icon: Bell, label: 'Send Notification', action: '' },
]

// const recentActivities = [
//   { action: 'Student registered', details: 'John Doe (Grade 10)', time: '2 hours ago' },
//   { action: 'Payment received', details: '$500 from Jane Smith', time: '4 hours ago' },
//   { action: 'Class created', details: 'Math 101 - Room 302', time: 'Yesterday' },
// ]

export function QuickActions() {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const handleQuickAction = (action: string) => {
    if (action === 'new-student') {
      setOpenDialog('new-student')
    }
    // Handle other actions here
  }

  return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {quickActions.map((action, index) => (
            <Dialog key={index} open={openDialog === action.action} onOpenChange={(open) => setOpenDialog(open ? action.action : null)}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction(action.action || '')}>
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </DialogTrigger>
              {action.action === 'new-student' && (
                <DialogContent className="max-w-fit ">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[80vh] pr-4">
                    <NewStudentForm onSuccess={() => setOpenDialog(null)} />
                  </ScrollArea>
                </DialogContent>
              )}
              {action.action === 'record-payment' && (
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[80vh] pr-4">
                    <RecordPaymentForm onSuccess={() => setOpenDialog(null)} />
                  </ScrollArea>
                </DialogContent>
              )}
              {action.action === 'invoices' && (
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Recent Invoices</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[80vh] pr-4">
                    <InvoicesList />
                  </ScrollArea>
                </DialogContent>
              )}
              {action.action === 'create-class' && (
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Class</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[80vh] pr-4">
                    <CreateClassForm onSuccess={() => setOpenDialog(null)} />
                  </ScrollArea>
                </DialogContent>
              )}
            </Dialog>
          ))}
        </CardContent>
      </Card>
  )
}

