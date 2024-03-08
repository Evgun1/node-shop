import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from '@/lib';
import { UserData, setUser } from './auth';

export function registerAction(userData: UserData) {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch(`http://localhost:5000/user/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userData),
      });
      if (!response.ok || response.status !== 200)
        throw new Error(response.statusText);

      const token = (await response.json()) as string;
      localStorage.setItem('token', token);
      const user = jwtDecode<UserData>(token);
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  };
}

export function loginAction(userData: UserData) {
  return async function (dispatch: AppDispatch) {
    const response = await fetch(`http://localhost:5000/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok || response.status !== 200)
      throw new Error(response.statusText);

    const tocken = (await response.json()) as string;
    localStorage.setItem('token', tocken);
    const user = jwtDecode<UserData>(tocken);
    dispatch(setUser(user));
  };
}

export function checkAuth() {
  return async function (dispatcher: AppDispatch) {
    const locasToken = localStorage.getItem('token');
    if (!locasToken) return;

    const response = await fetch('http://localhost:5000/user/auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${locasToken}`,
      },
    });
    if (!response.ok || response.status !== 200) {
      throw new Error(response.statusText);
    }
    const token = (await response.json()) as string;
    localStorage.setItem('token', token);
    const userData = jwtDecode<UserData>(token);
    dispatcher(setUser(userData));
  };
}
