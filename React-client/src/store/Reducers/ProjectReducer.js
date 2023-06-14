import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projectStore',
  initialState: {
    project: {},
    isLoading: false,
    isErrorFetch: {}
  },
  reducers: {
    loadPage(state, action){
      return {...state, isLoading: action.payload.isLoading}
    },
    ///////////////////////////////////
    //         get projects          //
    ///////////////////////////////////
    getUserProjects(state) {
      return { ...state, isLoading: true };
    },
    getUserProjectsSuccess(state, action) {
      return {
        ...state,
        user: action.payload.dataProject,
        isLoading: false,
        isErrorFetch: action.payload.data,
      };
    },
    getUserProjectsError(state, action) {
      return { 
        ...state,
        isLoading: action.payload.isLoading, 
        isErrorFetch: action.payload.data 
      };
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
