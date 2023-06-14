import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userStore',
  initialState: {
    user: {},
    isAuth: false,
    isLoading: true,
    isErrorFetch: {},
    isSuccess: false,
  },
  reducers: {
    loadPage(state, action){
      return {...state, isLoading: action.payload.isLoading}
    },
    ///////////////////////////////////
    //           login               //
    ///////////////////////////////////
    userLogin(state) {
      return { ...state, isLoading: true };
    },
    userLoginSuccess(state, action) {
      localStorage.setItem('token', action.payload.dataUser.accessToken);
      return {
        ...state,
        isLoading: false,
        user: action.payload.dataUser,
        isAuth: true,
        isErrorFetch: action.payload.data,
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
      return {
        ...state,
        isLoading: action.payload.isLoading,
        user: action.payload.dataUser,
        isAuth: false,
        isErrorFetch: action.payload.data,
        isSuccess: action.payload.isSuccess,
      };
    },
    userRegistrationError(state, action) {
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isErrorFetch: action.payload.data,
        isSuccess: action.payload.isSuccess,
      };
    },
    ///////////////////////////////////
    //            logout             //
    ///////////////////////////////////
    userLogout(state, action) {
      return { ...state, isLoading: action.payload.isLoading };
    },
    userLogoutSuccess(state, action) {
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: action.payload.isLoading,
        user: {},
        isAuth: false,
        isErrorFetch: action.payload.data,
      };
    },
    userLogoutError(state, action) {
      return { ...state, isLoading: action.payload.isLoading, isErrorFetch: action.payload.data };
    },
    ///////////////////////////////////
    //           checkAuth           //
    ///////////////////////////////////
    checkAuth(state, action) {
      return { isLoading: true };
    },
    checkAuthSuccess(state, action) {
      localStorage.setItem('token', action.payload.dataUser.accessToken);
      return {
        ...state,
        user: action.payload.dataUser,
        isAuth: true,
        isErrorFetch: {},
        isLoading: action.payload.isLoading,
      };
    },
    checkAuthError(state, action) {
      return { ...state, isLoading: action.payload.isLoading, isErrorFetch: action.payload.data };
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
  userLogoutSuccess,
  userLogoutError,
  checkAuth,
  checkAuthSuccess,
  checkAuthError,
  loadPage,
} = userSlice.actions;
