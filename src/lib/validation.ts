// import { PaymentMethod } from "@prisma/client";
// import { isLateRegistration } from "@/components/dashboard/NewStudentForm";
import { z } from "zod";

export const studentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    })
    .nonempty(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters." }),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date in the format YYYY-MM-DD.",
  }),
  guardianName: z
    .string()
    .min(2, { message: "Guardian name must be at least 2 characters." }),
  guardianPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  guardianEmail: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  className: z.string().min(1, { message: "Please select a class." }),
  paymentAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid payment amount.",
  }),
  //   .optional(),
  // paymentMethod: z.nativeEnum(
  //   PaymentMethod,
  //   {
  //     message: "Invalid payment method",
  //   }
  // ),
  paymentMethod: z.string(),


});

export const studentSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  //   lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    })
    .nonempty(),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date in the format YYYY-MM-DD.",
  }),
  email: z.union([
    z.string().email({ message: "Please enter a valid email address." }),
    z.literal(""),
  ]),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters." }),
  gender: z.enum(["male", "female", "other"]),
  //   enrollmentDate: z
  //     .string()
  //     .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  guardianFullName: z
    .string()
    .min(2, "Guardian full name must be at least 2 characters"),
  guardianEmail: z.union([
    z.string().email({ message: "Please enter a valid email address." }),
    z.literal(""),
  ]),
  guardianPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  className: z.string().min(1, "Class name is required"),
  paymentAmount: z.string().min(1, "Payment amount is required"),
  // paymentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  paymentMethod: z.string(),
  firstInstalmentDeadline: z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
secondInstalmentDeadline: z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

export type studentValues = z.infer<typeof studentSchema>;

export type studentFormValues = z.infer<typeof studentFormSchema>;

export const classSchema = z.object({
  name: z.string().min(2, "Class name must be at least 2 characters"),
  description: z.string().optional(),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
  teacher: z.string().min(2, "Teacher name must be at least 2 characters"),
  totalFee: z.number().nonnegative().optional(),
  registrationFee: z
    .number()
    .nonnegative("Registration fee must be a non-negative number"),
  firstInstallmentFee: z
    .number()
    .positive("First installment fee must be a positive number"),
  secondInstallmentFee: z
    .number()
    .positive("Second installment fee must be a positive number"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  firstInstalmentDeadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  secondInstalmentDeadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

export type classValues = z.infer<typeof classSchema>;

export const classFormSchema = z.object({
  className: z
    .string()
    .min(2, { message: "Class name must be at least 2 characters." }),
  // gradeLevel: z.string().min(1, { message: "Please select a grade level." }),
  teacherName: z
    .string()
    .min(2, { message: "Teacher name must be at least 2 characters." }),
  roomNumber: z.string().min(1, { message: "Room number is required." }),
  maxStudents: z
    .string()
    .regex(/^\d+$/, { message: "Please enter a valid number." }),
});

export type classFormValues = z.infer<typeof classFormSchema>;
