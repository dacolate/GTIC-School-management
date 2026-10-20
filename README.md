# GTIC School Management

An earlier full-stack implementation of the GTIC school-management system.

This application models students, classes, enrollments, payments, users, and administrative activity tracking with Next.js, Prisma, and PostgreSQL.

## Main Features

- Student registration and records
- Class creation and enrollment
- Tuition and installment tracking
- Payment records
- User roles for administrators, secretaries, and teachers
- Administrative activity history
- Responsive dashboard interface

## Tech Stack

- **Framework:** Next.js 15
- **Frontend:** React 19, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Forms / validation:** React Hook Form, Zod
- **UI:** Tailwind CSS, Radix UI, Lucide React

## Data Model

The application includes models for:

- Users and roles
- Students
- Classes
- Class enrollments
- Payments
- Administrative activities

## Getting Started

```bash
git clone https://github.com/dacolate/GTIC-School-management.git
cd GTIC-School-management
npm install
```

Configure `DATABASE_URL`, generate the Prisma client, and run the development server:

```bash
npx prisma generate
npm run dev
```

## Project Evolution

This repository represents an earlier full-stack version of the GTIC platform. Development later evolved into separate frontend and backend repositories:

- [gtic-frontend](https://github.com/dacolate/gtic-frontend)
- [gtic-backend](https://github.com/dacolate/gtic-backend)

Those repositories better represent the current architecture.
