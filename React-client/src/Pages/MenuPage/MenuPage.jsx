import React from 'react';
import '../OffsetStyle.css';
import './MenuPage.css';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import ContentMockAPI from '../../components/ContentMockAPI/ContentMockAPI';

const MenuPage = () => { 
  return (
    <>
      <div className="menuPage-container">
        <div className="menuPage-sideBar">
          <SidebarMenu />
        </div>
        <div className="menuPage-content">
          <div className="menuPage-navigation">
            <div className="menuPage-navigation__pageTitle">
              <img src="/image/icon-menu.svg" alt="menu" />
              <p>MockAPI</p>
            </div>
            <div className="menuPage-navigation__links">
              <p>Products</p>
              <p>Services</p>
              <p>About</p>
            </div>
          </div>
          <div>
            <ContentMockAPI/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
