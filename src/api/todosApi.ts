import { Todo } from "../store";

const API_TODOS_URL = `${import.meta.env.VITE_BASE_URL}/todos`;

export const getAllTodos = async (user_email: string): Promise<Todo[]> => {
  return user_email
    ? await fetch(`${API_TODOS_URL}/${user_email}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      } else if (res.status === 204) {
        return "No todos found!"
      }
      return res.json();
    }).catch(err => { console.error(err); throw err })
    : await Promise.reject(new Error('Invalid query parameter'))
}

export const createTodo = async (data: Partial<Todo>): Promise<Todo> => {
  return data.user_email
    ? await fetch(`${API_TODOS_URL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).catch(err => { console.error(err); throw err })
    : await Promise.reject(new Error('Invalid query parameter'))
}

export const editTodo = async (data: Partial<Todo>): Promise<Todo> => {
  return data.todo_id
    ? await fetch(`${API_TODOS_URL}/${data.todo_id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).catch(err => { console.error(err); throw err })
    : await Promise.reject(new Error('Invalid query parameter'))
}

export const deleteTodo = async (id: number): Promise<Todo> => {
  return id
    ? await fetch(`${API_TODOS_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).catch(err => { console.error(err); throw err })
    : await Promise.reject(new Error('Invalid query parameter'))
}