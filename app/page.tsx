import { getTodosListAction } from "@/actions/todo.actions";
import AddTodoFrom from "@/components/AddTodoForm";
import TodosTable from "@/components/TodosTable";

export default async function Home() {
  const todos = await getTodosListAction()

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <AddTodoFrom />
      <TodosTable todos={todos} />
    </div>
  );
}
