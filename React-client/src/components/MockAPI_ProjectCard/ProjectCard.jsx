import React from 'react';
import { v4 as uuidv4} from 'uuid'
import './ProjectCard.css'

const ProjectCard = () => {
  let id = uuidv4();
  return (
    <div className='project-card'>
      <div className='project-card-container'>
        <div className='project-card-topCard'>
          <div>
            <div className='project-card__title'>
              <p>Template</p>
            </div>
            <div className='project-card-time'>
              <img src="image/projectcard-clock.svg" alt="clock"/>
              <p>10 may 2023 y.</p>
            </div>
          </div>
          <div className='project-card__settings'>
            <div className='project-card__settings-circle'>
              <img src="image/projectcard-settings.svg" alt="settings" />
            </div>
          </div>
        </div>
        <div className='project-card-bottomCard'>
          <div className='project-card-on-off'>
            <input type="checkbox" id={id} />
            <label for={id}>Toggle</label>
            <p>Off</p>
          </div>
          <div className='project-card-count-resources'>
            <progress value={8} max={10} style={{width: "150px"}}></progress>
            <span>10/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
