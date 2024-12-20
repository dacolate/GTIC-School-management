import NewStudentForm from "@/components/dashboard/NewStudentForm";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "New Student Registration",
  description: "Register a new student in the school management system",
};

const classes = await prisma.class.findMany({
  select:{
    name: true,
    registrationFee: true,
    firstInstallmentFee: true,
    secondInstallmentFee: true,
    DeadlineFirst: true,
    DeadlineSecond: true,
    startDate: true,
    endDate: true,
    totalFee: true,
    
  }
})

export default function NewStudentPage() {
  console.log("classes",classes)
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-grow">
        {/* <h1 className="text-2xl font-bold mb-6">New Student Registration</h1> */}
        <NewStudentForm classes={classes}  />
      </div>
    </div>
  );
}
