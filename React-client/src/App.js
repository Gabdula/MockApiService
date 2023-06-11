import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './Pages/HomePage/HomePage';
import ErrorLoadPage from './Pages/ErrorLoadPage/ErrorLoadPage';
import ProjectsUserPage from './Pages/ProjectsUserPage/ProjectsUserPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage';
import MenuPage from './Pages/MenuPage/MenuPage';
import ModalInfo from './components/ModalInfo/ModalInfo';

function App() {
  const modalInfo = useSelector(state => state.modalInfo.modal)

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <ErrorLoadPage />,
    },
    {
      path: '/registration',
      element: <RegistrationPage />
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/',
      element: <MenuPage />,
    },
    {
      path: '/projects',
      element: <ProjectsUserPage />,
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
