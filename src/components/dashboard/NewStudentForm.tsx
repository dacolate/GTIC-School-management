"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CalendarIcon, DollarSign } from "lucide-react";
import { studentSchema, studentValues } from "@/lib/validation";
import { newStudent } from "@/app/actions/newStudentAction";
import { toast } from "@/hooks/use-toast";
import { isAfterMidpoint } from "@/lib/utils";

// const classes = [
//   {
//     id: "1",
//     name: "Class A",
//     year: "2023",
//     registrationFee: 100,
//     firstInstalment: { amount: 500, deadline: "2023-09-01" },
//     secondInstalment: { amount: 500, deadline: "2024-01-15" },
//     startDate: "2023-08-15",
//   },
//   {
//     id: "2",
//     name: "Class B",
//     year: "2023",
//     registrationFee: 120,
//     firstInstalment: { amount: 550, deadline: "2023-09-01" },
//     secondInstalment: { amount: 550, deadline: "2024-01-15" },
//     startDate: "2023-08-15",
//   },
// ];

// const studentSchema = z.object({
//   fullName: z.string().min(2, "Full name must be at least 2 characters"),
//   //   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   phone: z
//     .string()
//     .regex(/^\+?[1-9]\d{1,14}$/, {
//       message: "Please enter a valid phone number.",
//     })
//     .nonempty(),
//   email: z.string().email().optional(),
//   address: z
//     .string()
//     .min(3, { message: "Address must be at least 3 characters." }),
//   dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
//   gender: z.enum(["male", "female", "other"]),
//   //   enrollmentDate: z
//   //     .string()
//   //     .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
//   guardianFullName: z
//     .string()
//     .min(2, "Guardian full name must be at least 2 characters"),
//   guardianEmail: z.string().email("Invalid email address"),
//   guardianPhone: z.string().min(10, "Phone number must be at least 10 digits"),
//   className: z.string().min(1, "Class name is required"),
//   classYear: z.string().min(4, "Class year must be 4 digits"),
//   paymentAmount: z.string().min(1, "Payment amount is required"),
//   // paymentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
//   paymentMethod: z.string(),
//   firstInstalmentDeadline: z
//     .string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
//     .optional(),
//   secondInstalmentDeadline: z
//     .string()
//     .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
//     .optional(),
// });

// interface NewStudentFormProps {
//   onFormSubmit: () => void
// }

// interface NewStudentFormProps {
//   classNames: string[];
// }

interface ClassInfo {
  name: string;
  registrationFee: number;
  firstInstallmentFee: number;
  secondInstallmentFee: number;
  firstInstalmentDeadLine: Date;
  secondInstalmentDeadLine: Date;
  startDate: Date;
  endDate: Date;
  totalFee: number;
}

interface ClassListProps {
  classes: ClassInfo[];
}

export let isLateRegistration: boolean | null = false;

export default function NewStudentForm(classInfos: ClassListProps) {
  // { onFormSubmit }: NewStudentFormProps
  const [activeSection, setActiveSection] = useState<string | undefined>(
    "student-info"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  isLateRegistration =
    selectedClass &&
    isAfterMidpoint(selectedClass.startDate, selectedClass.endDate, new Date());
  // selectedClass && new Date() > new Date(selectedClass.startDate);

  //   const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const paymentMethods = ["Cash", "Credit_card", "Bank_transfer", "OM", "MOMO"];

  const form = useForm<studentValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      birthday: "",
      gender: "male", // Default value for gender select
      guardianFullName: "",
      guardianEmail: "",
      guardianPhone: "",
      className: "",
      paymentAmount: "",
      paymentMethod: "Cash",
      firstInstalmentDeadline:
        selectedClass?.firstInstalmentDeadLine?.toISOString().split("T")[0] || "",
      secondInstalmentDeadline:
        selectedClass?.secondInstalmentDeadLine?.toISOString().split("T")[0] || "",
    },
    mode: "onChange",
  });
  
  const {
    formState: { errors, isValid },
    watch,
  } = form;

  //   useEffect(() => {
  //     if (isFormSubmitted) {
  //       onFormSubmit()
  //     }
  //   }, [isFormSubmitted, onFormSubmit])

  async function onSubmit(values: studentValues) {
    console.log(values);
    setError(undefined);
    setIsSubmitting(true);

    // Trigger validation first
    // const isValid = await form.trigger();

    // console.log("isLateRegistration", isLateRegistration);
    // if (!isLateRegistration) {
    //   errors.firstInstalmentDeadline = undefined;
    //   errors.secondInstalmentDeadline = undefined;
    // }

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

  const watchAllFields = watch();

  const isStudentInfoComplete =
    !!watchAllFields.fullName &&
    !!watchAllFields.phone &&
    !!watchAllFields.address &&
    !!watchAllFields.birthday &&
    !!watchAllFields.gender &&
    // !!watchAllFields.enrollmentDate &&
    !errors.fullName &&
    !errors.phone &&
    !errors.email &&
    !errors.address &&
    !errors.birthday &&
    !errors.gender;
  // && !errors.enrollmentDate
  const isGuardianInfoComplete =
    isStudentInfoComplete &&
    !!watchAllFields.guardianFullName &&
    // !!watchAllFields.guardianAddress &&
    // !!watchAllFields.guardianEmail &&
    !!watchAllFields.guardianPhone &&
    !errors.guardianFullName &&
    // !errors.guardianAddress &&
    !errors.guardianEmail &&
    !errors.guardianPhone;

  const isClassInfoComplete =
    isGuardianInfoComplete &&
    !!watchAllFields.className &&
    // !!watchAllFields.classYear &&
    !errors.className;
  // && !errors.classYear;

  useEffect(() => {
    console.log("Student Info Complete:", isStudentInfoComplete);
    console.log("Guardian Info Complete:", isGuardianInfoComplete);
    console.log("Class Info Complete:", isClassInfoComplete);
    console.log("Errors:", errors);
    console.log("Watched Fields:", watchAllFields);
  }, [
    isStudentInfoComplete,
    isGuardianInfoComplete,
    isClassInfoComplete,
    errors,
    watchAllFields,
  ]);

  return (
    <Card className="w-full max-w-2xl mx-auto ">
      <CardHeader>
        <CardTitle>New Student Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Accordion
              type="single"
              collapsible
              value={activeSection}
              onValueChange={(value) => {
                if (
                  value === "student-info" ||
                  (value === "guardian-info" && isStudentInfoComplete) ||
                  (value === "class-info" && isGuardianInfoComplete) ||
                  (value === "payment-info" && isClassInfoComplete)
                ) {
                  setActiveSection(value);
                }
              }}
            >
              <AccordionItem value="student-info">
                <AccordionTrigger>Student Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            // onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="enrollmentDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enrollment Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="guardian-info"
                disabled={!isStudentInfoComplete}
              >
                <AccordionTrigger>Guardian Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="guardianFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input type="email" {...field} />
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
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="class-info"
                disabled={!isGuardianInfoComplete}
              >
                <AccordionTrigger>Class Information</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="className"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedClass(
                              classInfos.classes.find(
                                (c) => c.name === value
                              ) || null
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classInfos &&
                              classInfos.classes.map((cls, index) => (
                                <SelectItem key={index} value={cls.name}>
                                  {cls.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* {selectedClass && (
                    <div className="space-y-2 mt-4 bg-muted ">
                      <p>
                        Registration Fee: ${selectedClass.registrationFee}{" "}
                        (Started on:{" "}
                        {selectedClass.startDate.toISOString().split("T")[0]}) ){" "}
                      </p>
                      <p>
                        First Instalment: ${selectedClass.firstInstallmentFee}{" "}
                        (Due:{" "}
                        {
                          selectedClass.firstInstalmentDeadLine
                            .toISOString()
                            .split("T")[0]
                        }
                        )
                      </p>
                      <p>
                        Second Instalment: ${selectedClass.secondInstallmentFee}{" "}
                        (Due:{" "}
                        {
                          selectedClass.secondInstalmentDeadLine
                            .toISOString()
                            .split("T")[0]
                        }
                        )
                      </p>
                      <p>
                        Expected to end on:{" "}
                        {selectedClass.endDate.toISOString().split("T")[0]}{" "}
                      </p>

                      {isLateRegistration && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Late Registration</AlertTitle>
                          <AlertDescription>
                            {watchAllFields.fullName} is registering late and
                            might have to receive exceptional deadlines for
                            their fees.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )} */}
                  {selectedClass && (
                    <div className="mt-2 bg-muted">
                      {" "}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">
                              Registration Fee
                            </p>
                            <p className="text-lg font-semibold">
                              {selectedClass.registrationFee} FCFA
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Start Date</p>
                            <p className="text-lg font-semibold">
                              {
                                selectedClass.startDate
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Instalments
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">
                              First Instalment
                            </p>
                            <p className="text-lg font-semibold">
                              {selectedClass.firstInstallmentFee} FCFA
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Due:{" "}
                              {
                                selectedClass.firstInstalmentDeadLine
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Second Instalment
                            </p>
                            <p className="text-lg font-semibold">
                              {selectedClass.secondInstallmentFee} FCFA
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Due:{" "}
                              {
                                selectedClass.secondInstalmentDeadLine
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            Expected End Date
                          </p>
                          <p className="text-lg font-semibold">
                            {selectedClass.endDate.toISOString().split("T")[0]}
                          </p>
                        </div>
                      </div>{" "}
                    </div>
                  )}

                  {isLateRegistration && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Late Registration</AlertTitle>
                      <AlertDescription>
                        {watchAllFields.fullName} is registering late and might
                        have to receive exceptional deadlines for their fees.
                      </AlertDescription>
                    </Alert>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="payment-info"
                disabled={!isClassInfoComplete}
              >
                <AccordionTrigger>Payment Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="paymentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Amount</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
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
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethods.map((method, index) => (
                                <SelectItem key={index} value={method}>
                                  {method}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {isLateRegistration && (
                      <>
                        <FormField
                          control={form.control}
                          name="firstInstalmentDeadline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-500">
                                First Instalment Deadline
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className="border-red-500"
                                />
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
                              <FormLabel className="text-red-500">
                                Second Instalment Deadline
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  className="border-red-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="sticky bottom-0 bg-background p-4 border-t">
              <div className="flex flex-col justify-center">
                <span className="text-red-500 font-bold text-center mb-5">
                  {error}
                </span>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid && isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Student"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
