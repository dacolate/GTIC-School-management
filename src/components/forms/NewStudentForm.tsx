/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useTransition } from "react";
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
import { newStudent } from "@/app/actions/newStudentAction";
import { studentFormSchema, studentFormValues, studentValues } from "@/lib/validation";

// async function addStudentToDatabase(data: studentFormValues) {
//   const response = await fetch("/api/students", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to add student");
//   }

//   return response.json();
// }

export function NewStudentForm({
  onSuccess,
  classList,
}: {
  onSuccess: () => void;
  classList: string[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSection, setShowSection] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedClassFees, setSelectedClassFees] = useState(
    // <(typeof classFees)[keyof typeof classFees] | null>
    false
  );

  const form = useForm<studentValues>({
    resolver: zodResolver(studentFormSchema),
    mode: "onChange", // Tracks validation state in real-time
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      birthday: "",
      guardianFullName: "",
      guardianPhone: "",
      guardianEmail: "",
      className: "",
      paymentAmount: "",
      paymentMethod: undefined,
    },
  });

  const isCurrentSectionValid = () => {
    const errors = form.formState.errors;

    if (showSection === 0) {
      return !(
        errors.fullName ||
        errors.phone ||
        errors.email ||
        errors.address ||
        errors.birthday
      );
    }

    if (showSection === 1) {
      return !(
        errors.guardianFullName ||
        errors.guardianPhone ||
        errors.guardianEmail
      );
    }

    if (showSection === 2) {
      return !errors.className;
    }

    // Default case
    return true;
  };

  const validateCurrentSection = async () => {
    if (showSection === 0) {
      return await form.trigger([
        "fullName",
        "phone",
        "email",
        "address",
        "birthday",
      ]);
    }

    if (showSection === 1) {
      return await form.trigger([
        "guardianFullName",
        "guardianPhone",
        "guardianEmail",
      ]);
    }

    if (showSection === 2) {
      return await form.trigger(["className"]);
    }

    return true; // Default case
  };

  // Mock data for class fees
  const classFees = {
    class1: {
      total: 100000,
      registration: 20000,
      firstInstallment: 40000,
      secondInstallment: 40000,
    },
    class2: {
      total: 120000,
      registration: 25000,
      firstInstallment: 47500,
      secondInstallment: 47500,
    },
    class3: {
      total: 150000,
      registration: 30000,
      firstInstallment: 60000,
      secondInstallment: 60000,
    },
    class4: {
      total: 180000,
      registration: 35000,
      firstInstallment: 72500,
      secondInstallment: 72500,
    },
  };

  async function onSubmit(values: studentValues) {
    console.log("test");
    console.log(values);
    setError(undefined);
    setIsSubmitting(true);

    // Trigger validation first
    const isValid = await form.trigger();

    if (isValid) {
      const error = await newStudent(values);
      if (error) {
        console.log(error.error);
        setError(error.error);
        toast({
          title: "Error",
          description: "Failed to add student. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Student Added",
          description: `${values.fullName} has been added successfully.`,
        });
        form.reset();
        onSuccess();
      }
    } else {
      toast({
        title: "Validation Error",
        description: "There are errors in the form. Please correct them.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {showSection === 0 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Student Information</h3>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
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
              <div className="w-full flex justify-between">
                <Button disabled className="">
                  {"Prev"}
                </Button>
                <Button
                  className=""
                  onClick={async () => {
                    const isValid = await validateCurrentSection();
                    if (isValid) {
                      setShowSection(showSection + 1);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {"Next"}
                </Button>
              </div>
            </>
          )}

          {/* <Separator /> */}
          {showSection === 1 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Guardian Information</h3>
                <FormField
                  control={form.control}
                  name="guardianFullName"
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
              <div className="flex justify-between">
                <Button
                  className=""
                  onClick={() => setShowSection(showSection - 1)}
                >
                  {"Previous"}
                </Button>
                <Button
                  className=""
                  onClick={async () => {
                    const isValid = await validateCurrentSection();
                    if (isValid) {
                      setShowSection(showSection + 1);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {"Next"}
                </Button>
              </div>
            </>
          )}

          {/* <Separator /> */}
          {showSection === 2 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Class Information</h3>
                <FormField
                  control={form.control}
                  name="className"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setShowPayment(true);
                          setSelectedClassFees(true);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classList.map((classs, index) => (
                            <SelectItem key={index} value={classs}>
                              {classs}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedClassFees && (
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <h4 className="font-semibold mb-2">Class Fees</h4>
                    <p>Total Fee: {"1000"} FCFA</p>
                    <p>Registration Fee: {"400"} FCFA</p>
                    <p>
                      First Installment: {"300"}
                      FCFA
                    </p>
                    <p>Second Installment: {"300"} FCFA</p>
                  </div>
                )}
              </div>
              <div className="justify-between flex">
                <Button
                  className=""
                  onClick={() => setShowSection(showSection - 1)}
                >
                  {"Previous"}
                </Button>
                <Button
                  className=""
                  onClick={async () => {
                    const isValid = await validateCurrentSection();
                    if (isValid) {
                      setShowSection(showSection + 1);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {"Next"}
                </Button>
              </div>
            </>
          )}
          {showPayment && showSection === 3 && (
            <>
              {/* <Separator /> */}
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
              <div className="justify-between flex">
                <Button
                  className=""
                  onClick={() => setShowSection(showSection - 1)}
                >
                  {"Previous"}
                </Button>
                <Button
                  className=""
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Student"}
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
