import { useDispatch } from 'react-redux';
import { toggle } from '../../../store/popup/popup';
import Auth from './Auth';
import { useAppSelector } from '../../../hooks/redux';
import { logOut } from '../../../store/auth/auth';

const AuthBtn = () => {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  const toggleAuthHandler = () => dispatch(toggle(<Auth />));
  const btnLogOut = () => dispatch(logOut(null));
  console.log(auth);

  return (
    <>
      {auth && auth.role === 'admin' && (
        <button className={'nav-link'}>Admin</button>
      )}
      <button
        className={'nav-link'}
        onClick={auth ? btnLogOut : toggleAuthHandler}
      >
        {auth ? 'Log Out ' : 'Auth'}
      </button>
    </>
  );
};

export default AuthBtn;
