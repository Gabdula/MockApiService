import React, { useState, useEffect } from 'react';
import { formatDate } from '../../services/FormatDateService';
import { v4 as uuidv4} from 'uuid'
import './ProjectCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjectsAction } from '../../store/Actions/ProjectActions';

const ProjectCard = (props) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false);
  const { user } = useSelector((state) => state.userStore);
  let checkBtn;

  useEffect(() => {
    setChecked(props.isActive)
  }, []);
  
  if(checked){
    checkBtn = 'On'
  } else {
    checkBtn = 'Off'
  }



  let id = uuidv4();
  return (
    <div className='project-card'>
      <div className='project-card-container'>
        <div className='project-card-topCard'>
          <div>
            <div className='project-card__title'>
              <p>{props.projectName}</p>
            </div>
            <div className='project-card-time'>
              <img src="image/projectcard-clock.svg" alt="clock"/>
              <p>{formatDate(props.dateCreate)}</p>
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
            <input checked={checked} onClick={() => setChecked((checked) => checked = !checked)} type="checkbox" id={id} />
            <label htmlFor={id}>Toggle</label>
            <p>{checkBtn}</p>
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
