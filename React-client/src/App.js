import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter, useRoutes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalInfo from './components/ModalInfo/ModalInfo';
import { accountCheckAuth } from './store/Actions/ActionCreator';
import { setModalInfo } from './store/Reducers/ModalInfoReducer';
import Preloader from './components/Preloader/Preloader';
import { loadPage } from './store/Reducers/UserReducer';
import { getUserProjectsAction } from './store/Actions/ProjectActions';

import HomePage from './Pages/HomePage/HomePage';
import ProjectsUserPage from './Pages/ProjectsUserPage/ProjectsUserPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import MenuPage from './Pages/MenuPage/MenuPage';
import WrapperRequest from './components/WrapperRequest/WrapperRequest';


function App() {
  const dispatch = useDispatch();

  const modalInfo = useSelector((state) => state.modalInfo);
  const { isLoadingUser, isAuth } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(loadPage({ isLoadingUser: false }));
    if (localStorage.getItem('token')) {
      dispatch(accountCheckAuth());
    }
  }, []);

  // Отрисовка модального окна ошибки
  const { isErrorFetchUser } = useSelector((state) => state.userStore);
  const { isErrorFetchProject } = useSelector((state) => state.projectStore);
  useEffect(() => {
    if (isEmpty(isErrorFetchUser)) {
      dispatch(setModalInfo(isErrorFetchUser));
    } 
  }, [isErrorFetchUser]);
  
  useEffect(() => {
    if (isEmpty(isErrorFetchProject)){
      dispatch(setModalInfo(isErrorFetchProject));
    }
  }, [isErrorFetchProject]);

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return true;
      }
    }
    return false;
  }
  
  if (isLoadingUser) {
    return <Preloader />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'registration',
      element: <RegistrationPage />,
    },
    {
      path: 'menu',
      element: isAuth ? <MenuPage /> : <Navigate to="/login" />,
    },
    {
      path: '/',
      element: <Navigate to="/" />,
    }
  ]);



  return (
    <>
      <RouterProvider router={router} />
     
      <ModalInfo
        active={modalInfo.modal.modalActive}
        imgInfo={modalInfo.modal.imgInfo}
        title={modalInfo.modal.title}
        text={modalInfo.modal.text}
      />
    </>
  );
}

export default App;
