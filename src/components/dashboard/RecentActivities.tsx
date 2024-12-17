import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RecentActivities() {
  const activities = [
    { id: 1, action: 'Student registered', details: 'John Doe (Grade 10)', time: '2 hours ago' },
    { id: 2, action: 'Payment received', details: '$500 from Jane Smith', time: '4 hours ago' },
    { id: 3, action: 'Class created', details: 'Math 101 - Room 302', time: 'Yesterday' },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b pb-2 last:border-b-0 last:pb-0">
              <p className="font-medium">{activity.action}</p>
              <p className="text-sm text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

