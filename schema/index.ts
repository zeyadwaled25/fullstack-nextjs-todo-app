import { z } from "zod"

export type TodoFormValues = z.infer<typeof todoFormSchema>

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  body: z
    .string()
    .max(80, {
      message: "Body must not be longer than 80 characters.",
    })
    .optional(),
})

export const defaultValues: Partial<TodoFormValues> = {
  title: "Title",
  body: "Body",
}