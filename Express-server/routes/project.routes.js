import Router from 'express'; 
import ProjectController from '../controller/project.controller.js';

const projectController = new ProjectController();
const projectRouter = new Router();

projectRouter.get('/getProjects/:id', projectController.GetUserProject);
projectRouter.post('/createProject', projectController.CreateUserProject);
projectRouter.post('/cloneProject', projectController.CloneUserProject);
projectRouter.put('/editProject', projectController.EditUserProject);
projectRouter.delete('/deleteProject/:id', projectController.DeleteUserProject);

export default projectRouter; 

