import React from 'react';
import './HomePage.css';
import '../OffsetStyle.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="container-home">
        <div className="navigation-container">
          <div className="logo-container">
            <div className="logo">
              <img src="image/logo-site.png" alt="logo" width={60} height={60} />
              <p>Template</p>
            </div>
          </div>
          <div className="navigation-button">
            <p>Products</p>
            <p>Services</p>
            <p>About</p>
            <button>Sign In</button>
          </div>
        </div>
        <div className="home-content">
          <div className="home-content__text">
            <p>
              Save your time when developing <br />a software product with us
            </p>
            <p>
              We focus on saving your free time, <br />
              because development is not an easy task
            </p>
          </div>
          <div className="home-content__button">
            <button>Buy a subscription</button>
            <button>Get started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
