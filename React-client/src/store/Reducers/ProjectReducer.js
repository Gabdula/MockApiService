import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projectStore',
  initialState: {
    project: [],
    isLoadingProject: false,
    isErrorFetch: {},
  },
  reducers: {
    loadPage(state, action) {
      return { ...state, isLoadingProject: action.payload.isLoadingProject };
    },
    ///////////////////////////////////
    //         get projects          //
    ///////////////////////////////////
    getUserProjectsLoad(state) {
      return { ...state, isLoadingProject: true };
    },
    getUserProjectsSuccess(state, action) {
      return {
        ...state,
        project: action.payload.dataProject,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },
    getUserProjectsError(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },

    ///////////////////////////////////
    //        create Project         //
    ///////////////////////////////////
    createProjectLoad(state, action) {
      return { ...state, isLoadingProject: action.payload.isLoadingProject };
    },
    createProjectSuccess(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },
    createProjectError(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },

    ///////////////////////////////////
    //         clone Project         //
    ///////////////////////////////////
    cloneProjectLoad(state, action) {
      return { ...state, isLoadingProject: action.payload.isLoadingProject };
    },
    cloneProjectSuccess(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },
    cloneProjectError(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },

    ///////////////////////////////////
    //         edit projects         //
    ///////////////////////////////////
    editProjectLoad(state) {
      return { ...state, isLoadingProject: true };
    },
    editProjectSuccess(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },
    editProjectError(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },

    ///////////////////////////////////
    //        delete Project         //
    ///////////////////////////////////
    deleteProjectLoad(state) {
      return { ...state, isLoadingProject: true };
    },
    deleteProjectSuccess(state, action) {
      return {
        ...state,
        isLoadingProject: false,
        isErrorFetch: action.payload.data,
      };
    },
    deleteProjectError(state, action) {
      return {
        ...state,
        isLoadingProject: action.payload.isLoadingProject,
        isErrorFetch: action.payload.data,
      };
    },
  },
});

export default projectSlice.reducer;
export const {
  getUserProjectsLoad,
  getUserProjectsError,
  getUserProjectsSuccess,
  cloneProjectLoad,
  cloneProjectError,
  cloneProjectSuccess,
  createProjectLoad,
  createProjectError,
  createProjectSuccess,
  editProjectLoad,
  editProjectError,
  editProjectSuccess,
  deleteProjectLoad,
  deleteProjectError,
  deleteProjectSuccess,
} = projectSlice.actions;
