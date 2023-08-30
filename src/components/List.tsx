import {useAtom} from 'jotai';
import {Todo, todosAtom} from '../store';
import ListItem from './ListItem';
import {useMemo} from 'react';

const List = ({userEmail}: {userEmail: string}) => {
  const todoAtom = useMemo(() => todosAtom(userEmail), [userEmail]);
  const [todos] = useAtom(todoAtom);
  const sortedTodos = useMemo(() => {
    if (Array.isArray(todos)) {
      return todos?.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
    }
    return [] as Todo[];
  }, [todos]);
  return (
    <ul role="list">
      {sortedTodos?.map(todo => (
        <ListItem key={todo.todo_id} todo={todo} />
      ))}
    </ul>
  );
};

export default List;
