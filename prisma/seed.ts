// prisma/seed.ts

// import prisma from '@/lib/prisma';

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          role: i === 0 ? 'ADMIN' : 'SECRETARY',
          password: faker.internet.password(),
        },
      })
    );
    console.log('lol')
  }

  // Create Classes
  // const classes = [];
  // for (let i = 0; i < 3; i++) {
  //   classes.push(
  //     await prisma.class.create({
  //       data: {
  //         name: `Class ${faker.word.noun()}`,
  //         description: faker.lorem.sentence(),
  //         startDate: faker.date.future(),
  //         endDate: faker.date.future(),
  //         capacity: faker.number.int({ min: 10, max: 30 }),
  //         teacher: faker.name.fullName(),
  //         totalFee: faker.number.float({ min: 1000, max: 5000 }),
  //         registrationFee: 500,
  //         firstInstallmentFee: 1500,
  //         secondInstallmentFee: 2000,
  //       },
  //     })
  //   );
  // }

  // Create Students
  // const students = [];
  // for (let i = 0; i < 10; i++) {
  //   students.push(
  //     await prisma.student.create({
  //       data: {
  //         firstName: faker.name.firstName(),
  //         lastName: faker.name.lastName(),
  //         dateOfBirth: faker.date.birthdate({ min: 10, max: 18, mode: 'age' }),
  //       //   grade: faker.number.bigInt({ min: 1, max: 12 }),
  //         enrollmentDate: faker.date.past(),
  //         address: faker.address.streetAddress(),
  //         phoneNumber: faker.phone.number(),
  //         email: faker.internet.email(),
  //         guardianName: faker.name.fullName(),
  //         guardianPhone: faker.phone.number(),
  //       },
  //     })
  //   );
  // }

  // Enroll Students in Classes
  // for (let i = 0; i < students.length; i++) {
  //   await prisma.classEnrollment.create({
  //     data: {
  //       studentId: students[i].id,
  //       classId: classes[faker.number.int({ min: 0, max: classes.length - 1 })].id,
  //     },
  //   });
  // }

  // Record Payments
  // for (let i = 0; i < 15; i++) {
  //   await prisma.payment.create({
  //     data: {
  //       amount: faker.number.float({ min: 500, max: 2000 }),
  //       date: faker.date.recent(),
  //       method: faker.helpers.arrayElement(['CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'CHECK']),
  //       type: faker.helpers.arrayElement(['REGISTRATION', 'FIRST_INSTALLMENT', 'SECOND_INSTALLMENT']),
  //       studentId: students[faker.number.int({ min: 0, max: students.length - 1 })].id,
  //       classId: classes[faker.number.int({ min: 0, max: classes.length - 1 })].id,
  //     },
  //   });
  // }

  // Log Activities
  // for (let i = 0; i < 20; i++) {
  //   await prisma.activity.create({
  //     data: {
  //       action: faker.lorem.words(),
  //       description: faker.lorem.sentence(),
  //       performedBy: {
  //           connect: { id: users[faker.number.int({ min: 0, max: users.length - 1 })].id },
  //         },
  //       activityType: faker.helpers.arrayElement([
  //         'STUDENT_REGISTRATION',
  //         'CLASS_CREATION',
  //         'PAYMENT_RECEIVED',
  //         'STUDENT_ENROLLED',
  //         'USER_CREATED',
  //         'OTHER',
  //       ]),
  //     },
  //   });
  // }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
