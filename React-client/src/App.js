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

function App() {
  const dispatch = useDispatch();
  const modalInfo = useSelector((state) => state.modalInfo.modal);
  const { isLoadingUser, isAuth, user } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(loadPage({ isLoadingUser: false }));
    if (localStorage.getItem('token')) {
      dispatch(accountCheckAuth());
      console.log('Пользователь авторизован');
    } else {
      console.log('Авторизуйтесь');
    }
  }, []);

  // Отрисовка модального окна ошибки
  const { isErrorFetch } = useSelector((state) => state.userStore);
  useEffect(() => {
    if (isErrorFetch !== undefined) {
      dispatch(setModalInfo(isErrorFetch));
    }
  }, [isErrorFetch]);

  useEffect(() => {
    console.log(user)
    // dispatch(getUserProjectsAction(user.user.id))
  }, [])
  
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
    },
  ]);



  return (
    <>
      <RouterProvider router={router} />
      <ModalInfo
        active={modalInfo.modalActive}
        imgInfo={modalInfo.imgInfo}
        title={modalInfo.title}
        text={modalInfo.text}
      />
    </>
  );
}

export default App;
