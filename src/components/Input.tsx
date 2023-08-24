import { useState } from "react";
import { useDispatch } from "react-redux";
import { editedTodo } from "../store";

const Input = ({
  text,
  id,
  setIsEdit,
}: {
  text: string;
  id: number;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState<string>(text);
  return (
    <input
      type="text"
      tabIndex={0}
      autoFocus
      value={editTodo}
      onChange={(e) => setEditTodo(e.target.value)}
      onKeyDown={(e) => {
        const { key } = e;
        if (key === "Enter") {
          dispatch(editedTodo({ key: "todos", id, text: editTodo }));
          setIsEdit(false);
        }
      }}
      onBlur={() => {
        dispatch(editedTodo({ key: "todos", id, text: editTodo }));
        setIsEdit(false);
      }}
      className={
        "p-2 basis-[75%] ring-black ring-offset-2 focus:outline-none ring-2 focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.5)]"
      }
    />
  );
};

export default Input;
