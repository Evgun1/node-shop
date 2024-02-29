import { FormEventHandler, useEffect, useState } from 'react';
import classes from './Auth.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { loginAction, registerAction } from '../../../store/auth/authActions';
import { toggle } from '../../../store/popup/popup';

const Auth = () => {
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const email = formData.get('email')
      ? (formData.get('email') as string)
      : null;
    const password = formData.get('password')
      ? (formData.get('password') as string)
      : null;
    if (!email || !password) {
      return;
    }
    if (isRegistration) {
      dispatch(
        registerAction({
          email: email,
          password: password,
        })
      );
    } else {
      dispatch(
        loginAction({
          email: email,
          password: password,
        })
      );
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        dispatch(toggle(null));
      }, 1500);
    }
  }, [user]);

  const btnClik = () => setIsRegistration((prev) => !prev);
  return (
    <div className={classes.wrapper}>
      {user ? (
        <h2 style={{ padding: 15 }}>You have successfully logged in</h2>
      ) : (
        <>
          <h2>Authentication</h2>
          <form className={classes.form} action="" onSubmit={formSubmitHandler}>
            <div className={classes.inputWrapper}>
              <h5>Email</h5>
              <input type="email" name="email" />
            </div>
            <div className={classes.inputWrapper}>
              <h5>Password</h5>
              <input type="password" name="password" />
            </div>
            <button className={classes.btn}>
              {isRegistration ? 'Register' : 'login'}
            </button>
          </form>
          <button className={classes.btnNav} onClick={btnClik}>
            {isRegistration ? 'Sing In' : 'Registration'}
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
