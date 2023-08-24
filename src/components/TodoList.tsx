import ItemTodo from "./ItemTodo";
import { useDispatch } from "react-redux";
import { clearTodo, Todo } from "../store";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";

function TodoList({ todos }: { todos: Todo[] }) {
  const dispatch = useDispatch();

  return (
    <Droppable droppableId="TodosList">
      {(provided, snapshot) => (
        // ⬇️ Wrapper element
        <section
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={
            "bg-white/80 min-h-[60vh] p-4 md:p-6 w-[min(calc(90%-1rem),800px)] mx-auto rounded-2xl shadow " +
            (snapshot.isDraggingOver ? "bg-slate-50" : "")
          }
        >
          <div className="flex justify-between gap-2 items-end mb-2">
            <h1 className="" tabIndex={0}>
              To Do List
            </h1>
            <button
              type="button"
              id="clear-tasks"
              title="Clear the list"
              aria-label="Remove all tasks in the list"
              tabIndex={0}
              className="btn rounded-lg text-base md:text-xl py-2 px-1"
              onClick={() => dispatch(clearTodo("todos"))}
            >
              Clear
            </button>
          </div>
          <hr className="text-black w-full" />

          <ul>
            {todos.map((todo, idx) => (
              <ItemTodo index={idx} key={idx} todo={todo} />
            ))}
            {provided.placeholder}
          </ul>
        </section>
      )}
    </Droppable>
  );
}

export default TodoList;
