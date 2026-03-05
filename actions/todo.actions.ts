'use server'

import { ITodo } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getTodosListAction = async ({ userId }: { userId: string | null }) => {
  if (!userId) return [];
  return await prisma.todo.findMany({
    where: {
      user_id: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}
export const createTodoAction = async ({ title, body, completed, userId }: { title: string, body: string | undefined, completed: boolean, userId: string | null }) => {
  await prisma.todo.create({
    data: ({
      title,
      body,
      completed,
      user_id: userId as string,
    })
  })

  revalidatePath("/")
}
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id
    }
  })

  revalidatePath("/")
}
export const updateTodoAction = async (todo: ITodo) => {
  await prisma.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      title: todo.title,
      body: todo.body,
      completed: todo.completed,
    }
  })

  revalidatePath("/")
}

export const toggleTodoAction = async ({ id, completed }: { id: string, completed: boolean }) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    }
  })

  revalidatePath("/")
}