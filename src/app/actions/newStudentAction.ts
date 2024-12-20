/* eslint-disable @typescript-eslint/no-unused-vars */
// "use server";

// import prisma from "@/lib/prisma";
// import { studentFormSchema, studentFormValues } from "@/lib/validation";

// export async function newStudent(
//   values: studentFormValues
// ): Promise<{ error: string } | null> {
//   try {
//     // console.log(values);
//     const {
//       fullName,
//       phone,
//       address,
//       birthday,
//       guardianName,
//       guardianPhone,
//       email,
//       guardianEmail,
//       className,
//       paymentAmount,
//       paymentMethod
//     } = studentFormSchema.parse(values);

//     const birthDate = new Date(birthday);
//     // Checking if student already exists

//     const existingStudent = await prisma.student.findFirst({
//       where: {
//         OR: [
//           {
//             phoneNumber: {
//               equals: phone,
//               mode: "insensitive",
//             },
//           },
//           {
//             email: {
//               equals: email,
//               mode: "insensitive",
//             },
//           },
//         ],
//       },
//     });
//     if (existingStudent) {
//       return {
//         error: "Phone and/or email already registered",
//       };
//     }

//     const selectedClass = await prisma.class.findFirst({
//       where: {
//         name: {
//           equals: className,
//           mode: "insensitive",
//         },
//       },
//     });

//     if (!selectedClass) {
//       return {
//         error: "The specified class does not exist.",
//       };
//     }

//     await prisma.student.create({
//       data: {
//         fullName: fullName,
//         phoneNumber: phone,
//         email: email,
//         address: address,
//         dateOfBirth: birthDate,
//         guardianName: guardianName,
//         guardianPhone: guardianPhone,
//         guardianEmail: guardianEmail,

//         classes: {
//           create:{
//             class:{
//               connect: {id: selectedClass.id}
//             }
//           }
//         }

//       },
//     });

//     return null;
//   } catch (error) {
//     console.log(error.stack);
//     return {
//       error: "Something went wrong. Please try again.",
//     };
//   }
// }

"use server";

import prisma from "@/lib/prisma";
import { studentSchema, studentValues } from "@/lib/validation";
import { PaymentMethod, Gender } from "@prisma/client";
// import { PaymentMethod } from "@prisma/client";

export async function newStudent(
  values: studentValues
): Promise<{ error: string } | null> {
  try {
    console.log(values);
    // Parse and validate form inputs
    const {
      fullName,
      phone,
      address,
      birthday,
      guardianFullName,
      guardianPhone,
      email,
      guardianEmail,
      className,
      paymentAmount,
      paymentMethod,
      gender,
      firstInstalmentDeadline,
      secondInstalmentDeadline,
    } = studentSchema.parse(values);

    const birthDate = new Date(birthday);
    const firstDL = firstInstalmentDeadline
      ? new Date(firstInstalmentDeadline!)
      : undefined;

    const secondDL = secondInstalmentDeadline
      ? new Date(secondInstalmentDeadline!)
      : undefined;

    // Check if the student already exists
    const existingStudent = await prisma.student.findFirst({
      where: {
        phoneNumber: {
          equals: phone,
          mode: "insensitive",
        },
      },
    });

    if (existingStudent) {
      return {
        error: "Phone already registered.",
      };
    }

    // Find the class by name
    const selectedClass = await prisma.class.findFirst({
      where: { name: className },
    });

    if (!selectedClass) {
      console.log(" Not Found it!");
      return {
        error: "Selected class does not exist.",
      };
    }

    const genderMapping: Record<string, Gender> = {
      male: Gender.MALE,
      female: Gender.FEMALE,
      other: Gender.OTHER,
    };

    const normalizedGender = genderMapping[gender.toLowerCase()];

    const paymentMethodMapping: Record<string, PaymentMethod> = {
      cash: PaymentMethod.CASH,
      credit_card: PaymentMethod.CREDIT_CARD,
      bank_transfer: PaymentMethod.BANK_TRANSFER,
      om: PaymentMethod.OM,
      momo: PaymentMethod.MOMO,
    };

    const normalizedMethod = paymentMethodMapping[paymentMethod.toLowerCase()];

    if (!normalizedMethod) {
      throw new Error("Invalid payment method");
    }

    if (!normalizedGender) {
      throw new Error("Invalid payment gender");
    }

    // Create the student, class enrollment, and payment within a transaction
    await prisma.$transaction(async (tx) => {
      const newStudent = await tx.student.create({
        data: {
          fullName,
          phoneNumber: phone,
          email,
          address,
          dateOfBirth: birthDate,
          guardianName: guardianFullName,
          guardianPhone,
          guardianEmail,
          gender: normalizedGender,
        },
      });

      // Create the class enrollment
      await tx.classEnrollment.create({
        data: {
          student: { connect: { id: newStudent.id } },
          class: { connect: { id: selectedClass.id } },
          firstInstalmentDeadLine: firstDL,
          secondInstalmentDeadLine: secondDL,
          startDate:
            new Date() < selectedClass.startDate
              ? selectedClass.startDate
              : new Date(),
        },
      });

      // Create the payment if provided
      if (paymentAmount && paymentMethod) {
        await tx.payment.create({
          data: {
            amount: parseFloat(paymentAmount),
            method: normalizedMethod,
            student: { connect: { id: newStudent.id } },
            class: { connect: { id: selectedClass.id } },
            type: "REGISTRATION",
          },
        });
      }
    });

    return null; // Success
  } catch (error) {
    // console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
