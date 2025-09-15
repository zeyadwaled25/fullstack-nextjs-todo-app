import { getTodosListAction } from "@/actions/todo.actions";
import AddTodoFrom from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";

export default async function Home() {
  const todos = await getTodosListAction()

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <AddTodoFrom />
      <TodoTable />
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>{todo.title}</li>
          )
        })}
      </ul>
    </div>
  );
}
