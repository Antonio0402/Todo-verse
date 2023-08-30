import {useAtom} from 'jotai';
import {Todo, deleteTodoAtom, modalAtom} from '../store';
import Modal from './Modal';
import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';

const ListItem = ({todo}: {todo: Todo}) => {
  const [showModal, setShowModal] = useAtom(modalAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);
  return (
    <li className="list | rounded-xl shadow-sm">
      <div className="container">
        <TickIcon />
        <p className="w-80">{todo.title}</p>
        <ProgressBar progress={todo.progress} />
      </div>
      <div className="container">
        <button className="btn | " data-btn="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button
          className="btn | "
          data-btn="delete"
          onClick={() => deleteTodo([todo.todo_id])}
        >
          Delete
        </button>
      </div>
      {showModal && <Modal mode="edit" email={todo.user_email} task={todo} />}
    </li>
  );
};

export default ListItem;
