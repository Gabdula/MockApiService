import { createSlice } from '@reduxjs/toolkit';

const modelSlice = createSlice({
  name: 'modelStore',
  initialState: {
    model: {},
    isLoadingModel: false,
    isErrorFetchModel: {},
  },
  reducers: {
    loadPage(state, action) {
      return { ...state, isLoadingProject: action.payload.isLoadingProject };
    },
    ///////////////////////////////////
    //         get models            //
    ///////////////////////////////////
    getProjectModelLoad(state) {
      return { ...state, isLoadingModel: true };
    },
    getProjectModelSuccess(state, action) {
      return {
        ...state,
        model: action.payload.dataModel,
        isLoadingModel: action.payload.isLoadingModel,
      };
    },
    getProjectModelError(state, action) {
      return {
        ...state,
        isLoadingModel: action.payload.isLoadingModel,
        isErrorFetchModel: action.payload.data,
      };
    },

    // ///////////////////////////////////
    // //        create Project         //
    // ///////////////////////////////////
    // createProjectLoad(state, action) {
    //   return { ...state, isLoadingProject: action.payload.isLoadingProject };
    // },
    // createProjectSuccess(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },
    // createProjectError(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },

    // ///////////////////////////////////
    // //         clone Project         //
    // ///////////////////////////////////
    // cloneProjectLoad(state, action) {
    //   return { ...state, isLoadingProject: action.payload.isLoadingProject };
    // },
    // cloneProjectSuccess(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },
    // cloneProjectError(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },

    // ///////////////////////////////////
    // //         edit projects         //
    // ///////////////////////////////////
    // editProjectLoad(state) {
    //   return { ...state, isLoadingProject: true };
    // },
    // editProjectSuccess(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },
    // editProjectError(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },

    // ///////////////////////////////////
    // //        delete Project         //
    // ///////////////////////////////////
    // deleteProjectLoad(state) {
    //   return { ...state, isLoadingProject: true };
    // },
    // deleteProjectSuccess(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: false,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },
    // deleteProjectError(state, action) {
    //   return {
    //     ...state,
    //     isLoadingProject: action.payload.isLoadingProject,
    //     isErrorFetchProject: action.payload.data,
    //   };
    // },
  },
});

export default modelSlice.reducer;
export const {
  getProjectModelError,
  getProjectModelLoad,
  getProjectModelSuccess,
} = modelSlice.actions;
