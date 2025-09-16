import { getTodosListAction } from "@/actions/todo.actions";
import AddTodoFrom from "@/components/AddTodoForm";
import TodosTable from "@/components/TodosTable";
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()
  console.log(userId)
  const todos = await getTodosListAction({userId})

  return (
    <div className="font-sans min-h-screen px-8 pb-20 pt-6 gap-16 sm:px-20">
      <AddTodoFrom userId={userId} />
      <TodosTable todos={todos} />
    </div>
  );
}
