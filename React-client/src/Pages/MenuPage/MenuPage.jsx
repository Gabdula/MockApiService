import React, { useState } from 'react';
import '../OffsetStyle.css';
import './MenuPage.css';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import ContentMockAPI from '../../components/ContentMockAPI/ContentMockAPI';

const MenuPage = () => { 
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <div className="menuPage-container">
        <div className="menuPage-sideBar" style={menuOpen ? {minWidth: '6vw'}: {}}>
          <SidebarMenu menuOpen={menuOpen}/>
        </div>
        <div className="menuPage-content">
          <div className="menuPage-navigation">
            <div className="menuPage-navigation__pageTitle">
              <img src="/image/icon-menu.svg" alt="menu" onClick={() => setMenuOpen((menuOpen) => (menuOpen = !menuOpen))}/>
              <p>MockAPI</p>
            </div>
            <div className="menuPage-navigation__links">
              <p>Products</p>
              <p>Services</p>
              <p>About</p>
            </div>
          </div>
          <div style={{"flexGrow": "1", "display": "flex", "flexDirection": "column"}}>
            <ContentMockAPI menuOpen={menuOpen}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
