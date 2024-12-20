import { useState } from "react";
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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from "@/hooks/use-toast";
import { classFormSchema, classFormValues } from "@/lib/validation";
import { newClass } from "@/app/actions/newClassAction";

async function createClass(data: classFormValues) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Class created:", data);
  // In a real application, you would make an API call here
  return { success: true };
}

export function CreateClassForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const form = useForm<classFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      className: "",
      // gradeLevel: "",
      teacherName: "",
      roomNumber: "",
      maxStudents: "",
    },
  });

  async function onSubmit(values: classFormValues) {
    setError(undefined);
    setIsSubmitting(true);

    // Trigger validation first
    const isValid = await form.trigger();

    if (!isValid) {

      const error = await newClass(values);
      setError(error?.error);
      toast({
        title: "Error",
        description: "Failed to create class. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Class Created",
        description: `${values.className} has been successfully created.`,
      });
      form.reset();
      onSuccess();
    }

    // try {
    //   await createClass(values)
    //   toast({
    //     title: "Class Created",
    //     description: `${values.className} has been successfully created.`,
    //   })
    //   form.reset()
    //   onSuccess()
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create class. Please try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Mathematics 101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="teacherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxStudents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Number of Students</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating..." : "Create Class"}
        </Button>
      </form>
    </Form>
  );
}
