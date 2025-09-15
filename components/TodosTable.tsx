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
import { Pen, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { ITodo } from "@/interfaces"
import { Badge } from "./ui/badge"

export default function TodosTable({todos}: {todos: ITodo[]}) {
  return (
    <Table>
      <TableCaption>A list of todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell>{todo.id}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.completed ? <Badge variant="default">Completed</Badge> : <Badge variant="secondary">Uncompleted</Badge>}</TableCell>
            <TableCell className="flex items-center justify-end space-x-2">
              <Button size={"icon"}>
                <Pen />
              </Button>
              <Button size={"icon"} variant={"destructive"}>
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
