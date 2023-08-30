import { Todos } from "../model/todos.model.js";
import { query } from "./todos.database.js";
import { QueryResult } from "pg";

export const createTodo = async (title: string, progress: number, date: string, user_email?: string) => {
  const data: QueryResult<Todos> = await query("INSERT INTO public.todos(user_email, title, progress, date) VALUES($1, $2, $3, $4) RETURNING *;", [user_email, title, progress, date])
  return data.rows[0];
}

export const getAllTodos = async (userEmail: string) => {
  const data: QueryResult<Todos> = await query("SELECT * FROM public.todos WHERE user_email = $1;", [userEmail]);
  return data.rows;
}

export const updateTodo = async (title: string, progress: number, date: string, id: number, user_email?: string) => {
  const data: QueryResult<Todos> = await query("UPDATE public.todos SET title = $2, progress = $3, date = $4 WHERE todo_id = $5 AND user_email = $1 RETURNING *;", [user_email, title, progress, date, id])
  return data.rows[0];
}

export const deleteTodo = async (id: number, user_email?: string) => {
  const data: QueryResult<Todos> = await query("DELETE FROM public.todos WHERE todo_id = $1 AND user_email = $2 RETURNING *;", [id, user_email])
  return data.rows[0];
}