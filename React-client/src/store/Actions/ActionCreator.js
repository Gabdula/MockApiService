import AuthService from '../../services/AuthService';
import { store } from '..';
import {
  userRegistration,
  userRegistrationSuccess,
  userRegistrationError,
  userLogin,
  userLoginSuccess,
  userLoginError,
  userLogout,
  userLogoutSuccess,
  userLogoutError,
  checkAuth,
  checkAuthSuccess,
  checkAuthError,
} from '../Reducers/UserReducer';
import axios from 'axios';
import { API_URL } from '../../http';

export const accountRegistration = (login, email, password) => async (dispatch) => {
  let response;
  try {
    store.dispatch(userRegistration(true));
    response = await AuthService.registration(login, email, password);
    store.dispatch(
      userRegistrationSuccess({
        dataUser: response.data,
        isLoadingUser: false,
        isSuccess: true,
        data: {
          modalActive: true,
          imgInfo: 'accept',
          title: 'Успешная регистрация',
          text: 'Ваш аккаунт успешно создан, пожалуйста активируйте его, перейдя, по отправленной вам ссылке на почту.',
        },
      }),
    );
  } catch (e) {
    store.dispatch(
      userRegistrationError({
        isLoadingUser: false,
        isSuccess: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Ошибка регистрации',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};

export const accountLogin = (login, password) => async (dispatch) => {
  let response;
  try {
    store.dispatch(userLogin(true));
    response = await AuthService.login(login, password);
    store.dispatch(
      userLoginSuccess({
        dataUser: response.data,
        isLoadingUser: false,
        data: {
          modalActive: true,
          imgInfo: 'accept',
          title: 'Успешная авторизация',
          text: 'Ваш успешно вошли в свой аккаунт.',
          
        },
      }),
    );
  } catch (e) {
    store.dispatch(
      userLoginError({
        isLoadingUser: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Ошибка авторизации',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};

export const accountLogout = () => async (dispatch) => {
  try {
    store.dispatch(userLogout(true));
    await AuthService.logout();
    store.dispatch(
      userLogoutSuccess({
        isLoadingUser: false,
        data: {
          modalActive: true,
          imgInfo: 'alert',
          title: 'Выход из аккаунта',
          text: 'Вы успешео вышли из аккаунта',
          
        },
      }),
    );
  } catch (e) {
    store.dispatch(
      userLogoutError({
        isLoadingUser: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Непредвиденная ошибка',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};

export const accountCheckAuth = () => async (dispatch) => {
  try {
    store.dispatch(checkAuth(true));
    const response = await axios.get(`${API_URL}user/refresh`, { withCredentials: true });
    store.dispatch(checkAuthSuccess({ dataUser: response.data, isLoadingUser: false, }));
  } catch (e) { 
    store.dispatch(
      checkAuthError({
        isLoadingUser: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Непредвиденная ошибка',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};
