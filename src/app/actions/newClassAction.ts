/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/lib/prisma";
import { classSchema, classValues } from "@/lib/validation";

export async function newClass(
  values: classValues
): Promise<{ error: string } | null> {
  try {
    console.log(values);
    const {
      capacity,
      description,
      endDate,
      firstInstallmentFee,
      firstInstalmentDeadline,
      name,
      registrationFee,
      secondInstallmentFee,
      secondInstalmentDeadline,
      startDate,
      teacher,
    } = classSchema.parse(values);

    // Checking if class already exists

    const existingClass = await prisma.class.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
    if (existingClass) {
      return {
        error: "Class already registered",
      };
    }

    const Real_endDate = new Date(endDate);
    const Real_firstInstalmentDeadline = new Date(firstInstalmentDeadline);
    const Real_secondInstalmentDeadline = new Date(secondInstalmentDeadline);
    const Real_startDate = new Date(startDate);

    await prisma.class.create({
      data: {
        name,
        capacity,
        firstInstallmentFee: firstInstallmentFee,
        registrationFee,
        teacher,
        description,
        secondInstallmentFee: secondInstallmentFee,
        totalFee: firstInstallmentFee + registrationFee + secondInstallmentFee,
        endDate: Real_endDate,
        startDate: Real_startDate,
        DeadlineFirst: Real_firstInstalmentDeadline,
        DeadlineSecond: Real_secondInstalmentDeadline,
      },
    });

    return null;
  } catch (error) {
    // console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
