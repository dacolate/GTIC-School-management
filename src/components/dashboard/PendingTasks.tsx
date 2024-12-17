import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export function PendingTasks() {
  const tasks = [
    { id: 1, title: 'Pending payments', count: 5 },
    { id: 2, title: 'Unregistered students', count: 3 },
    { id: 3, title: 'Incomplete student profiles', count: 7 },
  ]

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center text-sm">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
              <span>{task.title}: </span>
              <span className="font-bold ml-1">{task.count}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

