import Router from 'express'; 
import UserProjects from '../controller/project.controller.js';

const userProjects = new UserProjects();
const projectRouter = new Router();

projectRouter.get('/getProjects', userProjects.GetUserProject);
projectRouter.post('/createProject', userProjects.CreateUserProject);
projectRouter.post('/cloneProject', userProjects.CloneUserProject);
projectRouter.put('/editProject', userProjects.EditUserProject);
projectRouter.delete('/deleteProject', userProjects.DeleteUserProject);

export default projectRouter; 

