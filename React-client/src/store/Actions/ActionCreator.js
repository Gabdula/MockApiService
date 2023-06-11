import AuthService from '../../services/AuthService';
import { store } from '..';
import {
  userRegistration,
  userRegistrationSuccess,
  userRegistrationError,
  userLogin,
  userLoginSuccess,
  userLoginError,
} from '../UserReducer';

export const accountRegistration = (login, email, password) => async (dispatch) => {
  let response;
  try {
    store.dispatch(userRegistration(true));
    response = await AuthService.registration(login, email, password);
    store.dispatch(
      userRegistrationSuccess({
        data: response.data,
        isLoading: false,
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
        isLoading: false,
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
        data: response.data,
        isLoading: false,
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
        isLoading: false,
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
