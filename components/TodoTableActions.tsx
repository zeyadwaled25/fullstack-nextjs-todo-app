'use client'

import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodoAction } from "@/actions/todo.actions";
import { useState } from "react";
import Spinner from "./Spinner";

const TodoTableActions = ({id} : {id: string}) => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Button size={"icon"}>
        <Pen size={16} />
      </Button>
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction({ id });
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : <Trash size={16} />}
      </Button>
    </>
  );
}

export default TodoTableActions;