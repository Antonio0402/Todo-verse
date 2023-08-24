import TaskEntry from "./components/TaskEntry";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { selectAllTodos, setAllTodo } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const newTodos = [...todos];
    const [removed] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, removed);
    dispatch(setAllTodo({ key: "todos", todos: newTodos }));
  };
  return (
    <main className="flex flex-col gap-6">
      <TaskEntry />
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList todos={todos} />
      </DragDropContext>
    </main>
  );
}

export default App;
