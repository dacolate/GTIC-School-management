import NewClassForm from "@/components/dashboard/NewClassForm"


export const metadata = {
  title: 'New Class Registration',
  description: 'Register a new class in the school management system',
}

export default function NewClassPage() {
  return (
    <div className="container mx-auto py-10">
      {/* <h1 className="text-2xl font-bold mb-6">New Class Registration</h1> */}
      <NewClassForm />
    </div>
  )
}