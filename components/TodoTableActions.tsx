'use client'

import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
import Spinner from "./Spinner";
import EditTodoFrom from "./EditTodoForm";
import { ITodo } from "@/interfaces";

const TodoTableActions = ({todo} : {todo: ITodo}) => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <EditTodoFrom todo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction({ id: todo.id });
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
}

export default TodoTableActions;