import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { PlusIcon } from "../icons";
import { addTodo } from "../store";
import { useDispatch } from "react-redux";

function TaskEntry() {
  const entryRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    if (entryRef.current?.value) {
      const todo = entryRef.current?.value;
      dispatch(addTodo({ key: "todos", text: todo }));
      entryRef.current.value = "";
    }
    entryRef.current?.blur();
  }
  return (
    <section className="p-4 md:p-6 w-[min(calc(90%-1rem),800px)] mx-auto rounded-2xl shadow sticky top-0 bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex relative gap-2 min-w-[calc(80%-1rem)] w-full items-center"
      >
        <label className="sr-only" htmlFor="new-task">
          Enter a new task
        </label>
        <input
          ref={entryRef}
          type="text"
          id="new-task"
          size={40}
          autoComplete="off"
          placeholder="Enter a Task"
          tabIndex={0}
          className="w-full rounded-lg py-2 px-4 text-xl border-2 border-black duration-200 shadow-inner focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.5)] focus:outline-none"
        />
        <button
          id="add-task"
          title="Add new task"
          aria-label="Add new task to list"
          tabIndex={0}
          type="submit"
          className="btn absolute text-xl md:text-2xl w-9 h-9 rounded-lg right-0 m-2 md:m-4 active:scale-75 active:shadow grid place-items-center"
        >
          <PlusIcon />
        </button>
      </form>
    </section>
  );
}

export default TaskEntry;
