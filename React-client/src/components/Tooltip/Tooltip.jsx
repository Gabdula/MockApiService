import React from 'react';
import './Tooltip.css';

const Tooltip = (props) => {

  return (
    <>
      <div className="tooltip-child">
        {props.children}
        <div className="tooltip-container">
          <div className='tooltip-wrapper'>
            {props.tooltip.map((text) => (
              <div key={text} className="tooltip-error">
                <img src="image/modalInfo-error.svg" alt="error" width={15} />
                <div className="tooltip-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tooltip;
