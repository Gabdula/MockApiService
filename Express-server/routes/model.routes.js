import Router from 'express'; 
import ModelController from '../controller/model.controller.js'

const modelController = new ModelController();
const modelRouter = new Router();

modelRouter.get('/:project_id/:prefix?/*', modelController.GetProjectModel);
modelRouter.get('/:project_id', modelController.GetModels);
modelRouter.post('/createModel', modelController.CreateProjectModel);




export default modelRouter; 
