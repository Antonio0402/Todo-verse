import React, {Suspense, useMemo} from 'react';
import {Auth as AuthData, /* userAtom, */ userEmailAtom} from '../store';
import {useAtom} from 'jotai';
import ListHeader from '../components/ListHeader.tsx';

const Auth = React.lazy(() => import('../components/Auth.tsx'));
const List = React.lazy(() => import('../components/List.tsx'));

const selectEmail = (res: AuthData) => {
  if (res.success && res.user) {
    return res.user.user_email;
  }
  return '';
};

const Home = () => {
  const emailAtom = useMemo(() => userEmailAtom(selectEmail), []);
  const [userEmail] = useAtom(emailAtom);
  return (
    <>
      {!userEmail ? (
        <Auth />
      ) : (
        <>
          <ListHeader
            listTitle={'Daily Routine Tick List'}
            user_email={userEmail || 'New User'}
          />
          <Suspense fallback={<p>Loading...</p>}>
            <p>Welcome back! {userEmail || 'New User'}</p>
          </Suspense>
          <Suspense fallback={<p>Loading...</p>}>
            <List userEmail={userEmail || 'New User'} />
          </Suspense>
        </>
      )}
      <p className="m-8 text-text mx-auto">© Managing Daily Routine with Todo App</p>
    </>
  );
};

export default Home;
