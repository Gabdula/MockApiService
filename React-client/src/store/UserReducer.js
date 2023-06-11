import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

const userSlice = createSlice({
  name: 'userStore',
  initialState: {
    user: {},
    isAuth: false,
    isLoading: false,
    isErrorFetch: {},
    isSuccess: {}
  },
  reducers: {
    ///////////////////////////////////
    //           login               //
    ///////////////////////////////////
    userLogin(state, action) {
      return { ...state, isLoading: action.payload.isLoading };
    },
    userLoginSuccess(state, action) {
      localStorage.setItem('token', action.payload.data.accessToken);
      return {
        ...state,
        isLoading: action.payload.isLoading,
        user: action.payload.data,
        isAuth: true,
        isErrorFetch: {},
        isSuccess: action.payload.data
      };
    },
    userLoginError(state, action) {
      return { ...state, isLoading: action.payload.isLoading, isErrorFetch: action.payload.data };
    },
    ///////////////////////////////////
    //         registration          //
    ///////////////////////////////////
    userRegistration(state, action) {
      return { ...state, isLoading: action.payload.isLoading };
    },
    userRegistrationSuccess(state, action) {
      localStorage.setItem('token', action.payload.data.accessToken);
      return {
        ...state,
        isLoading: action.payload.isLoading,
        user: action.payload.data,
        isAuth: false,
        isErrorFetch: {},
        isSuccess: action.payload.data
      };
    },
    userRegistrationError(state, action) {
      return { ...state, isLoading: action.payload.isLoading, isErrorFetch: action.payload.data };
    },
    ///////////////////////////////////
    //            logout             //
    ///////////////////////////////////
    async userLogout() {
      try {
        const response = await AuthService.logout();
        console.log(response);
        localStorage.removeItem('token');
        userSlice.getInitialState.isAuth = false;
        userSlice.getInitialState.user = {};
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    },
  },
});

export default userSlice.reducer;
export const {
  userLogin,
  userLoginSuccess,
  userLoginError,
  userRegistration,
  userRegistrationSuccess,
  userRegistrationError,
  userLogout,
} = userSlice.actions;
