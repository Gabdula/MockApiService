import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SidebarMenu.css'
import { useDispatch, useSelector } from 'react-redux';
import { accountLogout } from '../../store/Actions/ActionCreator';

const SidebarMenu = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const { user } = useSelector((state) => state.userStore);

  const logoutUser = () => {
    navigation('/')
    dispatch(accountLogout())
  }
  
  return (
    <>
      {/* sidebar-menu__link-name__close */}
      {/* sidebar-menu__close */}
      <div className="container-menu">
        <div className="sidebar-menu sidebar-menu__link-name__close ">
          <div className="logo-container">
            <div className="logo">
              <img src="image/logo-site.png" alt="logo" width={60} height={60} />
              <span id="side-logo-text">Template</span>
            </div>
          </div>

          <ul className="sidebar-menu__nav-links">
            <li>
              <p className="sidebar-menu__nav-links__selected">
                <img className='sidebar-menu__nav-links__img' src="image/sidebar-api.svg" alt="mockapi" />
                <span id="full-name-link">MockApi</span>
              </p>

              <div className="sidebar-menu__link-name">
                <span id="prev-name-link">MockApi</span>
              </div>
            </li>

            <li>
              <p>
                <img className='sidebar-menu__nav-links__img' src="image/sidebar-model.svg" alt="mockapi" width={40} />
                <span id="full-name-link">ORM Model</span>
              </p>

              <div className="sidebar-menu__link-name">
                <span id="prev-name-link">ORM Model</span>
              </div>
            </li>

            <li style={{ marginTop: "auto" }}>
              <p className='sidebar-menu__nav-links__profile' onClick={() => logoutUser()}>
                <img src="image/logo-site.png" alt="logo" width={60} height={60} />
                <div id="side-profile-span" className='sidebar-menu__profile'>
                  <span>{user.user.user}<br/></span>
                  <span>{user.user.role.map((item) => `${item} `)}</span>
                </div>
                <img id="side-profile-img" className='sidebar-menu__nav-links__img' src="image/sidebar-exit.svg" alt="mockapi" width={40} />
              </p>
              
            </li>
            
          </ul>
        </div>
      </div>
    </>
  );
}

export default SidebarMenu;
