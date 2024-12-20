import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'

const formSchema = z.object({
  reason: z.enum(["student_fees", "other"]),
  class: z.string().optional(),
  student: z.string().optional(),
  paymentAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid payment amount." }),
  paymentMethod: z.enum(["cash", "credit_card", "bank_transfer"]),
})

// Mock data for classes and students
const classes = ["Class 1", "Class 2", "Class 3", "Class 4"]
const studentsByClass:  {
    [key: string]: string[];
  } = {
  "Class 1": ["John Doe", "Jane Smith", "Alice Johnson"],
  "Class 2": ["Bob Williams", "Charlie Brown", "Diana Davis"],
  "Class 3": ["Eva Wilson", "Frank Thomas", "Grace Lee"],
  "Class 4": ["Henry Taylor", "Ivy Clark", "Jack Robinson"],
}

async function recordPayment(data: z.infer<typeof formSchema>) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  // console.log('Payment recorded:', data)
  // In a real application, you would make an API call here
  return { success: true }
}

export function RecordPaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "student_fees",
      paymentAmount: "",
      paymentMethod: "cash",
    },
  })

  const watchReason = form.watch("reason")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await recordPayment(values)
      toast({
        title: "Payment Recorded",
        description: "The payment has been successfully recorded.",
        action: (
            <ToastAction altText="Invoice">Invoice</ToastAction>
          ),
      })
      form.reset()
      onSuccess()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student_fees">Student Fees</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchReason === "student_fees" && (
          <>
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedClass(value)
                      form.setValue("student", "") // Reset student when class changes
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedClass && (
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studentsByClass[selectedClass].map((student) => (
                          <SelectItem key={student} value={student}>{student}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}

        <FormField
          control={form.control}
          name="paymentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Record Payment
        </Button>
      </form>
    </Form>
  )
}

