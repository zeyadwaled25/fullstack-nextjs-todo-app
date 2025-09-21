'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ITodo } from "@/interfaces"
import TodoTableActions from "./TodoTableActions";
import { toggleTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
import { CheckCircle, Circle, Clock, Plus } from "lucide-react";
import { Badge } from "./ui/badge";

export default function TodosTable({ todos }: { todos: ITodo[] }) {
  const [loadingTodos, setLoadingTodos] = useState<string[]>([]);

  const handleToggleTodo = async (todo: ITodo) => {
    setLoadingTodos(prev => [...prev, todo.id]);
    try {
      await toggleTodoAction({ id: todo.id, completed: todo.completed });
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setLoadingTodos(prev => prev.filter(id => id !== todo.id));
    }
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Plus className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No todos yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Get started by creating your first todo. Click the &quot;Add Todo&quot; button above to begin organizing your tasks.
      </p>
    </div>
  );

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm mt-5">
      <Table className="table-fixed">
        <TableCaption className="my-3">A list of your todos.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-24 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow
              key={todo?.id}
              className={`group cursor-pointer hover:bg-muted/50 transition-all duration-200 ${todo?.completed ? 'opacity-75' : ''
                }`}
              onClick={() => handleToggleTodo(todo)}
            >
              <TableCell className="w-12">
                {loadingTodos.includes(todo.id) ? (
                  <Clock className="w-5 h-5 text-muted-foreground animate-spin" />
                ) : todo?.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </TableCell>
              <TableCell className="font-medium">
                <div className="max-w-[300px]">
                  <div className={`truncate ${todo?.completed ? 'line-through text-muted-foreground' : ''}`} title={todo?.title}>
                    {todo?.title}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px]">
                  <div className={`truncate text-sm text-muted-foreground ${todo?.completed ? 'line-through' : ''}`} title={todo?.body || 'No description'}>
                    {todo?.body || 'No description'}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {loadingTodos.includes(todo.id) ? (
                  <Badge variant="outline">Updating...</Badge>
                ) : (
                  todo?.completed ? (
                    <Badge variant="default">Completed</Badge>
                  ) : (
                    <Badge variant="secondary">Uncompleted</Badge>
                  )
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {todo?.createdAt ? new Date(todo.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }) : 'N/A'}
              </TableCell>
              <TableCell className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                <TodoTableActions todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-left">
              {!todos.length ? "You Don't have any todos yet!" : "Total"}
            </TableCell>
            <TableCell className="text-right">
              {!todos.length ? "" : todos.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
