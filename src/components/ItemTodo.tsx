import { useState, lazy, Suspense } from "react";
import { CheckedIcon, DeleteIcon } from "../icons";
import { Todo } from "../store";
import { useDispatch } from "react-redux";
import { checkedTodo, removeTodo } from "../store";
import { Draggable } from "react-beautiful-dnd";

const InputTodo = lazy(() => import("./Input"));

function ItemTodo({ index, todo }: { index: number; todo: Todo }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={
            "bg-white border border-black/20 shadow rounded py-4 px-2 my-2 w-full flex justify-around items-center gap-4  " +
            (snapshot.isDragging ? "shadow-md" : "")
          }
        >
          {isEdit && !todo.checked ? (
            <Suspense fallback={<div>Loading...</div>}>
              <InputTodo id={todo.id} text={todo.text} setIsEdit={setIsEdit} />
            </Suspense>
          ) : (
            <span
              onDoubleClick={() => setIsEdit(true)}
              className={
                "text-base md:text-xl p-2 basis-[75%] " +
                (todo.checked ? "line-through" : "")
              }
            >
              {todo.text}
            </span>
          )}
          <button
            type="button"
            title="check button"
            aria-label="completed the task"
            tabIndex={0}
            className="p-2 rounded-lg btn"
            onClick={() => {
              if (todo) {
                dispatch(checkedTodo({ key: "todos", id: todo.id }));
              }
            }}
          >
            <CheckedIcon />
          </button>
          <button
            type="button"
            id={`${todo.id}`}
            title="delete button"
            aria-label="delete the task"
            tabIndex={0}
            className="p-2 rounded-lg btn"
            onClick={() => dispatch(removeTodo({ key: "todos", id: todo.id }))}
          >
            <DeleteIcon />
          </button>
        </li>
      )}
    </Draggable>
  );
}

export default ItemTodo;
