import ProjectService from '../../services/ProjectService';
import { store } from '..';
import {
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
} from '../Reducers/ProjectReducer';

export const getUserProjectsAction = (userID) => async (dispatch) => {
  try {
    store.dispatch(getUserProjectsLoad({ isLoadingProject: true }));
    const response = await ProjectService.getUserProjects(userID);
    store.dispatch(
      getUserProjectsSuccess({
        dataProject: response.data,
        isLoadingProject: false,
      }),
    );
  } catch (e) {
    store.dispatch(
      getUserProjectsError({
        isLoadingProject: false,
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

export const createProjectAction = (projectName, userID, prefixApi) => async (dispatch) => {
  try {
    store.dispatch(createProjectLoad({ isLoadingProject: true }));
    const response = await ProjectService.createProject(projectName, userID, prefixApi);
    store.dispatch(
      createProjectSuccess({
        dataProject: response.data,
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'accept',
          title: 'Создание проекта',
          text: 'Проект успешно создан.',
          
        },
      }),
    );
    store.dispatch(getUserProjectsAction(userID))
  } catch (e) {
    store.dispatch(
      createProjectError({
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Создание проекта',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};

export const cloneProjectAction = (projectID, userID) => async (dispatch) => {
  try {
    store.dispatch(cloneProjectLoad({ isLoadingProject: true }));
    const response = await ProjectService.cloneProject(projectID, userID);
    store.dispatch(
      cloneProjectSuccess({
        dataProject: response.data,
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'accept',
          title: 'Успешная клонирование',
          text: 'Ваш проект успешно клонирован.',
          
        },
      }),
    );
    store.dispatch(getUserProjectsAction(userID))
  } catch (e) {
    store.dispatch(
      cloneProjectError({
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Ошибка клонирования',
          text: e.response?.data.message,
        },
      }),
    );
  }
};

export const editProjectAction = (projectID, projectName, prefixApi, userID) => async (dispatch) => {
  try {
    store.dispatch(editProjectLoad({ isLoadingProject: true }));
    const response = await ProjectService.editProject(projectID, projectName, prefixApi);
    store.dispatch(
      editProjectSuccess({
        dataProject: response.data,
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'accept',
          title: 'Успешное редактирование',
          text: 'Проект успешно изменен.',
          
        },
      }),
    );
    store.dispatch(getUserProjectsAction(userID))
  } catch (e) {
    store.dispatch(
      editProjectError({
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Ошибка редактирования проекта',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};

export const deleteProjectAction = (projectID, userID) => async (dispatch) => {
  try {
    store.dispatch(deleteProjectLoad({ isLoadingProject: true }));
    const response = await ProjectService.deleteProject(projectID);
    store.dispatch(
      deleteProjectSuccess({
        dataProject: response.data,
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'accept',
          title: 'Удаление проекта',
          text: 'Проект успешно удален.',
          
        },
      }),
    );
    store.dispatch(getUserProjectsAction(userID))
  } catch (e) {
    store.dispatch(
      deleteProjectError({
        isLoadingProject: false,
        data: {
          modalActive: true,
          imgInfo: 'error',
          title: 'Удаление проекта',
          text: e.response?.data.message,
          
        },
      }),
    );
  }
};
