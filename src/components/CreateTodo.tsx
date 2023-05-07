import { api } from "@/utils/api";
import Todo from "@/components/Todo";
import { useState } from "react";
import { todoInput } from "@/types";
import { toast } from "react-hot-toast";

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState("");

  // acccesses the query cache
  const trpc = api.useContext();

  const { mutate } = api.todo.create.useMutation({
    // will invalidate the todos in the cache and refetch all
    onSettled: async () => await trpc.todo.all.invalidate(),
  });

  return (
    <div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("SUBMIT");
          const result = todoInput.safeParse(newTodo);

          if (!result.success) {
            console.log("not valid");
            toast.error(result.error.format()._errors.join("\n"));
            console.log(result.error.format()._errors.join("\n"));
            return;
          }

          // Create todo mutation
          mutate(newTodo);
        }}
      >
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="New Todo..."
          type="text"
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
          Create
        </button>
      </form>
    </div>
  );
}
