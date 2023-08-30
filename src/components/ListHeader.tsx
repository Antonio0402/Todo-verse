import {useAtom} from 'jotai';
import Modal from './Modal';
import {modalAtom} from '../store';
import {logout} from '../api/authApi';
import {queryClientAtom} from 'jotai-tanstack-query';

const ListHeader = ({listTitle, user_email}: {listTitle: string; user_email: string}) => {
  const [showModal, setShowModal] = useAtom(modalAtom);
  const [queryClient] = useAtom(queryClientAtom);
  const onLogOut = async () => {
    await logout();
    return queryClient.invalidateQueries(['user']);
  };
  return (
    <div className="header | w-full border-b-black/50">
      <h1>{listTitle}</h1>
      <div className="header__button | container">
        <button className="btn |" data-btn="create" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="btn |" data-btn="signout" onClick={onLogOut}>
          Sign out
        </button>
      </div>
      {showModal && <Modal mode="create" email={user_email} />}
    </div>
  );
};

export default ListHeader;
