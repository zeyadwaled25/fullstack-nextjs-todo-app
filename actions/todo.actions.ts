'use server'

import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export const getTodosListAction = async ({ userId }: { userId?: string | null }) => {
  if (!userId) {
    return [];
  }
  try {
    const todos = await prisma.todo.findMany({
      where: { user_id: userId },
      orderBy: { createdAt: 'desc' },
    });
    return todos;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return [];
  }
}

export const createTodoAction = async ({title, body, completed, userId} : {title: string, body: string | undefined, completed: boolean, userId: string | null}) => {
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
export const deleteTodoAction = async ({id}: {id: string}) => {
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