'use server'

import { TodoFormValues } from "@/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getTodosListAction = async () => {
  return await prisma.todo.findMany()
}
export const createTodoAction = async ({title, body} : TodoFormValues) => {
  return await prisma.todo.create({
    data: ({
      title,
      body,
    })
  })
}
export const updateTodoAction = async () => {}
export const deleteTodoAction = async () => {}