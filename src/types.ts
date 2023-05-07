import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodosOutPut = RouterOutputs["todo"]["all"];

// one of the Todos in the list
export type Todo = allTodosOutPut[number];

// the input for creating a new Todo for TRPC server
export const todoInput = z
  .string({ required_error: "Describe your todo" })
  .min(1)
  .max(50);
