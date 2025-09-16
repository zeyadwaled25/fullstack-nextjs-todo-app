'use client';

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
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
import { useForm } from "react-hook-form"
import { todoFormSchema, TodoFormValues } from "@/schema";
import { updateTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import Spinner from "./Spinner";
import { ITodo } from "@/interfaces";

const EditTodoFrom = ({todo} : {todo: ITodo}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo.title,
      body: todo.body as string,
      completed: todo.completed,
    },
    mode: "onChange",
  })

  const onSubmit = async (data: TodoFormValues) => {
    setLoading(true)
    await updateTodoAction({id: todo.id, title: data.title, body: data.body as string, completed: data.completed})
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button size={"icon"}><Pen /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit this Todo</DialogTitle>
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
                        <Input placeholder="Add title of your todo" {...field} />
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
                          placeholder="Tell us a little bit about your todo body"
                          className="resize-none"
                          {...field}
                          />
                      </FormControl>
                      <FormDescription>You can write a short description about your next todo.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="completed"
                  render={({field}) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Completed</FormLabel>
                      </div>
                      <FormDescription>Your to-do item will be uncompleted by default unless you checked it.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? <><Spinner /> Saving</> : "Save"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default EditTodoFrom;