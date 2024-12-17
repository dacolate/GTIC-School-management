"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Please enter a valid date in the format YYYY-MM-DD.",
    }),
  guardianName: z
    .string()
    .min(2, { message: "Guardian name must be at least 2 characters." }),
  guardianPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    }),
  guardianEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  class: z.string().min(1, { message: "Please select a class." }),
  paymentAmount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid payment amount.",
    })
    .optional(),
  paymentMethod: z.enum(["cash", "credit_card", "bank_transfer"]).optional(),
});

async function addStudentToDatabase(data: z.infer<typeof formSchema>) {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add student");
  }

  return response.json();
}

export function NewStudentForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedClassFees, setSelectedClassFees] = useState<typeof classFees[keyof typeof classFees] | null>(null)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      birthday: "",
      guardianName: "",
      guardianPhone: "",
      guardianEmail: "",
      class: "",
      paymentAmount: "",
      paymentMethod: undefined,
    },
  });
  // Mock data for class fees
const classFees = {
  class1: { total: 100000, registration: 20000, firstInstallment: 40000, secondInstallment: 40000 },
  class2: { total: 120000, registration: 25000, firstInstallment: 47500, secondInstallment: 47500 },
  class3: { total: 150000, registration: 30000, firstInstallment: 60000, secondInstallment: 60000 },
  class4: { total: 180000, registration: 35000, firstInstallment: 72500, secondInstallment: 72500 },
}

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await addStudentToDatabase(values);
      toast({
        title: "Student Added",
        description: `${values.fullName} has been added successfully.`,
      });
      form.reset();
      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Student Information</h3>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Guardian Information</h3>
            <FormField
              control={form.control}
              name="guardianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guardianPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guardianEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guardian Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jane.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Class Information</h3>
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Select 
                  onValueChange={(value) => {
                    field.onChange(value)
                    setShowPayment(true)
                    setSelectedClassFees(classFees[value as keyof typeof classFees])
                  }} 
                  defaultValue={field.value}
                >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="class1">Class 1</SelectItem>
                      <SelectItem value="class2">Class 2</SelectItem>
                      <SelectItem value="class3">Class 3</SelectItem>
                      <SelectItem value="class4">Class 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedClassFees && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Class Fees</h4>
              <p>Total Fee: {selectedClassFees.total} FCFA</p>
              <p>Registration Fee: {selectedClassFees.registration} FCFA</p>
              <p>First Installment: {selectedClassFees.firstInstallment} FCFA</p>
              <p>Second Installment: {selectedClassFees.secondInstallment} FCFA</p>
            </div>
          )}
          </div>

          {showPayment && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                <FormField
                  control={form.control}
                  name="paymentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="credit_card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="bank_transfer">
                            Bank Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Adding..." : "Add Student"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
