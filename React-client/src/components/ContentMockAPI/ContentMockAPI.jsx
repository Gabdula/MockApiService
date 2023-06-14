import React, { useEffect } from 'react';
import ProjectCard from '../MockAPI_ProjectCard/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import './ContentMockApi.css';
import { getUserProjectsAction } from '../../store/Actions/ProjectActions';

const ContentMockAPI = (props) => {
  const dispatch = useDispatch();
  const { isLoadingUser, user } = useSelector((state) => state.userStore);
  const { isLoadingProject, project } = useSelector((state) => state.projectStore);

  useEffect(() => {
    dispatch(getUserProjectsAction(user.user.id));
  }, [isLoadingUser]);

  return (
    <>
      <div className="ContentMockAPI-create">
        <span>Project</span>
        <span>{project.length}/5</span>
        <button>+ Create</button>
      </div>
      <div className="ContentMockAPI-container">
        {project.length > 0 ? project.map((item, key) => 
          <ProjectCard
            key={key}
            dateCreate={item.date_create}
            isActive={item.isactive}
            prefixApi={item.prefix_api}
            projectName={item.project_name}
          />
        ) : <div className='ContentMockAPI-empty-project'>You don't have any projects yet...</div>}
      </div>
    </>
  );
};

export default ContentMockAPI;
