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
import { Badge } from "./ui/badge"
import TodoTableActions from "./TodoTableActions";
import { toggleTodoAction } from "@/actions/todo.actions";
import { useState } from "react";

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

  return (
    <Table className="mt-2">
      <TableCaption>A list of your todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, index) => (
          <TableRow
            key={todo?.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleToggleTodo(todo)}
          >
            <TableCell className="font-mono text-sm">{index + 1}</TableCell>
            <TableCell className="font-medium max-w-[200px] truncate" title={todo?.title}>
              {todo?.title}
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
              {todo?.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'N/A'}
            </TableCell>
            <TableCell className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
              <TodoTableActions todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className={"text-right"}>{!todos.length ? "You Don't have any todos yet!" : todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
