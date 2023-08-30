import {ChangeEvent, FormEvent, useMemo} from 'react';

import {useAtom, useSetAtom} from 'jotai';

import {Todo, createTodoAtom, editTodoAtom, modalAtom, todoAtom} from '../store';

const Modal = ({mode, email, task}: {mode: string; email: string; task?: Todo}) => {
  const editMode = mode === 'edit';
  const setShowModal = useSetAtom(modalAtom);
  const [todo, setTodo] = useAtom(
    useMemo(() => todoAtom(editMode, email, task), [editMode, email, task])
  );

  const [, createTodo] = useAtom(createTodoAtom);
  const [, editTodo] = useAtom(editTodoAtom);

  function handleTodo(e: ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setTodo({[name]: value});
  }

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      editMode ? await editTodo([todo]) : await createTodo([todo]);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="overlay | bg-black/50">
      <div className="modal | bg-white rounded-xl shadow-lg">
        <div className="modal__title">
          <h3>Let's {mode} Your Task</h3>
          <button
            className="btn | border-none hover:text-danger active:text-[color:rgb(255, 50, 50)]"
            data-btn="close"
            onClick={() => setShowModal(false)}
          >
            x
          </button>
        </div>

        <form className="modal__form">
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={todo.title}
            onChange={handleTodo}
          />
          <label className="text-sm" htmlFor="range">
            Drag to select your current progress
          </label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={todo.progress}
            onChange={handleTodo}
          />
          <button
            className="btn | "
            data-btn={mode}
            type="submit"
            disabled={!todo.title}
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
