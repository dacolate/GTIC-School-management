"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { classSchema, classValues } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";
import { newClass } from "@/app/actions/newClassAction";

export default function NewClassForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const form = useForm<classValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 0,
      teacher: "",
      totalFee: 0,
      registrationFee: 0,
      firstInstallmentFee: 0,
      secondInstallmentFee: 0,
      startDate: "",
      endDate: "",
      firstInstalmentDeadline: "",
      secondInstalmentDeadline: "",
    },
  });

  const { watch, setValue } = form;

  const registrationFee = watch("registrationFee");
  const firstInstallmentFee = watch("firstInstallmentFee");
  const secondInstallmentFee = watch("secondInstallmentFee");

//   const totalFees = 0;

  useEffect(() => {
    const totalFees =
      registrationFee + firstInstallmentFee + secondInstallmentFee || 0;
    setValue("totalFee", totalFees);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationFee, firstInstallmentFee, secondInstallmentFee]);

  const onSubmit = async (values: classValues) => {
    console.log(values);
    setError(undefined);
    setIsSubmitting(true);
    // Here you would typically send the data to your backend

    // Trigger validation first
    const isValid = await form.trigger();

    if (isValid) {
      const error = await newClass(values);
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
          description: `${values.name} has been added successfully.`,
        });
        form.reset();
      }
    } else {
      toast({
        title: "Validation Error",
        description: "There are errors in the form. Please correct them.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto ">
      <CardHeader>
        <CardTitle>New Class Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="general-info">
                <AccordionTrigger>General Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teacher"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teacher</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fees">
                <AccordionTrigger>Fees</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="registrationFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Fee</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="firstInstallmentFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Installment Fee</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="secondInstallmentFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Second Installment Fee</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Fees</FormLabel>
                          <FormControl>
                            <div className="text-lg font-semibold">
                              {field.value} FCFA
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dates">
                <AccordionTrigger>Dates</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstInstalmentDeadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Instalment Deadline</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="secondInstalmentDeadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Second Instalment Deadline</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col justify-center">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <span className="text-red-500 font-bold text-center mb-5">
                  {error}
                </span>
                {isSubmitting ? "Submitting..." : "Create Class"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
