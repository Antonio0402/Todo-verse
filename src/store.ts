import { atomsWithMutation, atomsWithQuery, queryClientAtom } from "jotai-tanstack-query";
import { getUser, login, register } from "./api/authApi";
import { atom } from "jotai";
import { createTodo, deleteTodo, editTodo, getAllTodos } from "./api/todosApi";

export type Todo = {
  todo_id: number;
  user_email: string;
  title: string;
  progress: number;
  date: string | Date;
}

export type User = {
  user_email: string;
}

export type Auth = {
  success: boolean;
  message: string;
  user?: User;
}

export const [, loginAtom] = atomsWithMutation((get) => {
  const queryClient = get(queryClientAtom);
  return ({
    mutationKey: ["login"],
    mutationFn: ({ user_email, password }: { user_email: string; password: string }) => login(user_email, password),
    onSuccess: (data: User | undefined) => {
      if (data) {
        queryClient.invalidateQueries(["user"])
      }
    }
  })
})

export const [, registerAtom] = atomsWithMutation((_get) => {
  return ({
    mutationKey: ["register"],
    mutationFn: ({ user_email, password }: { user_email: string; password: string }) => register(user_email, password),
  })
})

export const userEmailAtom = (select: (res: Auth) => string | undefined) => {
  const [userAtom] = atomsWithQuery((_get) => ({
    queryKey: ["user"],
    queryFn: getUser,
    select,
    staleTime: Infinity,
    suspense: true,
  }))
  return userAtom;
}

export const todosAtom = (email: string) => {
  const [baseAtom] = atomsWithQuery((_get) => ({
    queryKey: ["todos", email],
    queryFn: () => getAllTodos(email),
    keepPreviousData: true,
    enabled: Boolean(email),
    suspense: true,
  }))
  return baseAtom;
}

export const [, createTodoAtom] = atomsWithMutation((get) => {
  const queryClient = get(queryClientAtom);
  return {
    mutationKey: ["todos", "create"],
    mutationFn: (data: Partial<Todo>) => createTodo(data),
    onSuccess: (data: Todo) => queryClient.invalidateQueries(["todos", data.user_email])
  }
})

export const [, editTodoAtom] = atomsWithMutation((get) => {
  const queryClient = get(queryClientAtom);
  return {
    mutationKey: ["todos", "edit"],
    mutationFn: (data: Partial<Todo>) => editTodo(data),
    onSuccess: (data: Todo) => queryClient.invalidateQueries(["todos", data.user_email])
  }
})

export const [, deleteTodoAtom] = atomsWithMutation((get) => {
  const queryClient = get(queryClientAtom);
  return {
    mutationKey: ["todos", "delete"],
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries(["todos"])
  }
})

export const modalAtom = atom(false);

export const todoAtom = (mode: boolean, email: string, task?: Todo) => {
  const baseAtom = atom({
    todo_id: task?.todo_id,
    user_email: mode ? task?.user_email : email,
    title: mode ? task?.title : "",
    progress: mode ? task?.progress : 50,
    date: mode ? task?.date : new Date()
  })

  const deriveAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === "function" ?
        update(get(baseAtom)) : update;
      const prev = get(baseAtom);
      const newValue = { ...prev, ...nextValue };
      set(baseAtom, newValue);
    }
  )
  return deriveAtom;
}

