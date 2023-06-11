import Router from 'express'; 
import ModelController from '../controller/model.controller.js'

const modelController = new ModelController();
const modelRouter = new Router();

modelRouter.get('/getModel', modelController.GetProjectModel);
modelRouter.post('/createModel', modelController.CreateProjectModel);




export default modelRouter; 
