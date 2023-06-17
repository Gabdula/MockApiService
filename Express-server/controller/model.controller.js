import ModelService from "../service/model.service.js";
const modelService = new ModelService();
import { fakerRU, faker } from '@faker-js/faker';

class ModelController {
  async GetProjectModel(req, res){
    try {
      
    } catch (e) {
      console.log(e);
    }
  }
  async CreateProjectModel(req, res){
    try {
      const {id_project, model_name, count_record, schema} = req.body;
      const model = await modelService.createProjectModel(id_project, model_name, count_record, schema);
      // return res.json('Success');
      return res.json(model);
    } catch (e) {
      console.log(e);
    }
  }
}

export default ModelController;