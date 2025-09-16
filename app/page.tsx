import { getTodosListAction } from "@/actions/todo.actions";
import AddTodoFrom from "@/components/AddTodoForm";
import TodosTable from "@/components/TodosTable";

export default async function Home() {
  const todos = await getTodosListAction()

  return (
    <div className="font-sans min-h-screen px-8 pb-20 pt-6 gap-16 sm:px-20">
      <AddTodoFrom />
      <TodosTable todos={todos} />
    </div>
  );
}
