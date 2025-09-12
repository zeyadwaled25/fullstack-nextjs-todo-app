'use client';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { todoFormSchema, TodoFormValues, defaultValues } from "@/schema";
import { createTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const AddTodoFrom = () => {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = (data: TodoFormValues) => {
    console.log(data)

    const {title, body, completed} = data
    createTodoAction({title, body, completed})
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button><Plus size={16} />Add Todo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Add title of your todo." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Body</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about your todo body..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="completed"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Completed</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Save changes</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddTodoFrom;