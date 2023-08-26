import React from 'react';
import './SelectMock.css';

const SelectMock = () => {
  return (
    <div className="SelectMock-wrapper">
      <div className="SelectMock-container__inputField">
        <div className="SelectMock-inputField">
          <div className="SelectMock-text">Template</div>
          <div className="SelectMock-button">*</div>
        </div>
      </div>
      <div className="SelectMock-container__dropdown">
        <div className="SelectMock-list">
          <div className="SelectMock-list__title">
            <p>Title</p>
          </div>
          <hr />
          <p>Hello</p>
          <p>World</p>
        </div>
      </div>
    </div>
  );
};

export default SelectMock;
