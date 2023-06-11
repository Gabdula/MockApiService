import React from 'react';
import ProjectCard from '../MockAPI_ProjectCard/ProjectCard'
import './ContentMockApi.css'

const ContentMockAPI = (props) => {
  return (
    <>
    <div className='ContentMockAPI-create'>
      <span>Template</span>
      <span>3/5</span>
      <button>+ Create</button>
    </div>
    <div className='ContentMockAPI-container'>
      <ProjectCard/>
      <ProjectCard/>
      <ProjectCard/>
    </div>
    </>
  );
}

export default ContentMockAPI;
