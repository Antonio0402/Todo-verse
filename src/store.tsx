import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

const getInitialValue = (key: string, initialValue: any) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  // return result of a function
  if (typeof initialValue === "function") return initialValue();
  return initialValue;
};

const initialState: { todos: Todo[] } = {
  todos: getInitialValue("todos", []),
};

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAllTodo: (
      state,
      action: PayloadAction<{ key: string; todos: Todo[] }>
    ) => {
      state.todos = action.payload.todos;
      localStorage.setItem(action.payload.key, JSON.stringify(state.todos));
    },
    addTodo: (state, action: PayloadAction<{ key: string; text: string }>) => {
      const id = state.todos.length
        ? state.todos[state.todos.length - 1].id + 1
        : 1;
      state.todos = [
        ...state.todos,
        {
          id,
          text: action.payload.text,
          checked: false,
        },
      ];
      localStorage.setItem(action.payload.key, JSON.stringify(state.todos));
    },
    checkedTodo: (
      state,
      action: PayloadAction<{ key: string; id: number }>
    ) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload.id
          ? { ...todo, checked: !todo.checked }
          : todo;
      });
      localStorage.setItem(action.payload.key, JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<{ key: string; id: number }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem(action.payload.key, JSON.stringify(state.todos));
    },
    editedTodo: (
      state,
      action: PayloadAction<{ key: string; id: number; text: string }>
    ) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo;
      });
      localStorage.setItem(action.payload.key, JSON.stringify(state.todos));
    },
    clearTodo: (state, action: PayloadAction<string>) => {
      state.todos = [];
      localStorage.setItem(action.payload, JSON.stringify(state.todos));
    },
  },
});

export const store = configureStore({
  reducer: {
    todos: TodosSlice.reducer,
  },
});

export const {
  setAllTodo,
  addTodo,
  removeTodo,
  checkedTodo,
  editedTodo,
  clearTodo,
} = TodosSlice.actions;

type RootState = ReturnType<typeof store.getState>;

export const selectAllTodos = (state: RootState) => state.todos.todos;

export default store;
