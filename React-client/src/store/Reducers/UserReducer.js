import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userStore',
  initialState: {
    user: {},
    isAuth: false,
    isLoadingUser: true,
    isErrorFetchUser: {},
    isSuccess: false,
  },
  reducers: {
    loadPage(state, action){
      return {...state, isLoadingUser: action.payload.isLoadingUser}
    },
    ///////////////////////////////////
    //           login               //
    ///////////////////////////////////
    userLogin(state) {
      return { ...state, isLoadingUser: true };
    },
    userLoginSuccess(state, action) {
      localStorage.setItem('token', action.payload.dataUser.accessToken);
      return {
        ...state,
        isLoadingUser: false,
        user: action.payload.dataUser,
        isAuth: true,
        isErrorFetchUser: action.payload.data,
      };
    },
    userLoginError(state, action) {
      return { ...state, isLoadingUser: action.payload.isLoadingUser, isErrorFetchUser: action.payload.data };
    },
    ///////////////////////////////////
    //         registration          //
    ///////////////////////////////////
    userRegistration(state, action) {
      return { ...state, isLoadingUser: action.payload.isLoadingUser };
    },
    userRegistrationSuccess(state, action) {
      return {
        ...state,
        isLoadingUser: action.payload.isLoadingUser,
        user: action.payload.dataUser,
        isAuth: false,
        isErrorFetchUser: action.payload.data,
        isSuccess: action.payload.isSuccess,
      };
    },
    userRegistrationError(state, action) {
      return {
        ...state,
        isLoadingUser: action.payload.isLoadingUser,
        isErrorFetchUser: action.payload.data,
        isSuccess: action.payload.isSuccess,
      };
    },
    ///////////////////////////////////
    //            logout             //
    /////////////////////////////////// 
    userLogout(state, action) {
      return { ...state, isLoadingUser: action.payload.isLoadingUser };
    },
    userLogoutSuccess(state, action) {
      localStorage.removeItem('token');
      return {
        ...state,
        isLoadingUser: action.payload.isLoadingUser,
        user: {},
        isAuth: false,
        isErrorFetchUser: action.payload.data,
      };
    },
    userLogoutError(state, action) {
      return { ...state, isLoadingUser: action.payload.isLoadingUser, isErrorFetchUser: action.payload.data };
    },
    ///////////////////////////////////
    //           checkAuth           //
    ///////////////////////////////////
    checkAuth(state, action) {
      return { isLoadingUser: true };
    },
    checkAuthSuccess(state, action) {
      localStorage.setItem('token', action.payload.dataUser.accessToken);
      return {
        ...state,
        user: action.payload.dataUser,
        isAuth: true,
        isErrorFetchUser: {},
        isLoadingUser: action.payload.isLoadingUser,
      };
    },
    checkAuthError(state, action) {
      return { ...state, isLoadingUser: action.payload.isLoadingUser, isErrorFetchUser: action.payload.data };
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
