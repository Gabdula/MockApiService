import React from 'react';
import ProjectCard from '../MockAPI_ProjectCard/ProjectCard'
import { useDispatch, useSelector } from 'react-redux';
import './ContentMockApi.css'

const ContentMockAPI = (props) => {
  const { user } = useSelector((state) => state.userStore);
  console.log(user) 
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
