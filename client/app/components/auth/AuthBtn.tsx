'use client';

import Auth from './Auth';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { toggle } from '@/lib/store/popup/popup';
import { logOut } from '@/lib/store/auth/auth';
import { FC } from 'react';
import Popup from '../Layouts/Popup/Popup';
import { log } from 'console';

const AuthBtn: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  const toggleAuthHandler = () => dispatch(toggle(<Auth />));
  const btnLogOut = () => dispatch(logOut(null));

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
