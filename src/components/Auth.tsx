import {atom, useAtom} from 'jotai';
import {User, loginAtom, registerAtom} from '../store';
import {FormEvent} from 'react';
import {queryClientAtom} from 'jotai-tanstack-query';

const emailAtom = atom('');
const passwordAtom = atom('');
const confirmAtom = atom('');
const isLoginAtom = atom(true);

const Auth = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPwd, setConfirmPwd] = useAtom(confirmAtom);
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const [queryClient] = useAtom(queryClientAtom);

  const [, login] = useAtom(loginAtom);
  const [, register] = useAtom(registerAtom);

  async function handleSubmit(e: FormEvent<HTMLButtonElement>, endPoint: string) {
    e.preventDefault();
    if (endPoint === 'login') {
      await login([
        {user_email: email, password},
        {
          onSuccess: (data: User | undefined) => {
            if (data) {
              setEmail('');
              setPassword('');
              queryClient.invalidateQueries(['user']);
            }
          }
        }
      ]);
    } else if (endPoint === 'signup') {
      console.log(email, password);
      await register([
        {user_email: email, password},
        {
          onSuccess: (data: User) => {
            setEmail('');
            setPassword('');
            setConfirmPwd('');
            return queryClient.setQueryData(['user'], {
              success: true,
              message: data,
              user_email: email
            });
          }
        }
      ]);
    }
  }
  return (
    <div className="auth">
      <div className="auth_box | w-[500px] rounded-xl overflow-hidden shadow-xl p-8">
        <form
          className="auth__form"
          // onSubmit={e => handleSubmit(e, isLogin ? 'login' : 'signup')}
        >
          <h2>{isLogin ? 'Please log in ' : 'Please sign up!'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm password"
              onChange={e => setConfirmPwd(e.target.value)}
            />
          )}
          <button
            type="submit"
            onClick={e => handleSubmit(e, isLogin ? 'login' : 'signup')}
            className="btn | py-2 text-base"
            data-btn="create"
          >
            Proccess
          </button>
          <p className={`${!isLogin && password !== confirmPwd ? 'block' : 'hidden'}`}>
            Make sure passwords match!
          </p>
        </form>
        <div className="auth__options">
          <button
            className={`btn | ${!isLogin ? 'bg-white' : 'bg-gray-200'}`}
            data-btn="auth"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={`btn | ${isLogin ? 'bg-white' : 'bg-gray-200'}`}
            data-btn="auth"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
