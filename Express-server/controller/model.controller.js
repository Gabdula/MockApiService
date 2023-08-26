import ModelService from "../service/model.service.js";
const modelService = new ModelService();
import ApiError from '../exceptions/api-error.js';
import { fakerRU, faker } from '@faker-js/faker';

class ModelController {
  async CreateProjectModel(req, res){
    try {
      const {id_project, model_name, count_record, schema} = req.body;
      const model = await modelService.createProjectModel(id_project, model_name, count_record, schema);
      return res.json(model);
    } catch (e) {
      console.log(e);
    }
  }

  async GetProjectModel (req, res, next) {
    try {
      const {project_id, prefix} = req.params;
      if(req.params[0] === undefined){
        throw ApiError.BadRequest('Not found')
      }
      if(await modelService.checkPrefix(project_id, prefix)){
        req.params[0] = prefix + '/' + req.params[0]
      }
      const model = await modelService.testService(project_id, req.params[0].split('/'))
      return res.json(model)
    } catch (e) {
      next(e)
    }
  }

  async GetModels (req, res, next) {
    try {
      const {project_id} = req.params;
      const models = await modelService.getModels(project_id)
      return res.json(models)
    } catch (e) {
      next(e)
    }
  }

  // async GetEndpointProject (req, res, next){
  //   try {
  //     const {project_id, endpoint, id, prefix} = req.params;
  //     let idLocal = +id;
  //     if(isNaN(parseFloat(idLocal))){
  //       console.log('y')
  //       prefixLocal = id;
  //       idLocal = null
  //     }
  //     const response = await modelService.getEndpointProject(project_id, endpoint, idLocal);
  //     return res.json(response);
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // async GetEndpointProjectById (req, res, next){
  //   try {
  //     const {project_id, endpoint, id, prefix} = req.params;
  //     console.log('GetEndpointProjectById')
  //     console.log(project_id, endpoint, id, prefix)
  //     const response = await modelService.getEndpointProjectById(project_id, endpoint, id);
  //     return res.json(response);
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  async GetEndpointProjectChild (req, res, next){
    try {
      const {project_id, endpoint1, id, endpoint2, prefix} = req.params;
      console.log(project_id, endpoint1, id, endpoint2, prefix)
      const response = await modelService.getEndpointProjectChild(project_id, id, endpoint2);
      // return res.json('Success');
      return res.json(response);
    } catch (e) {
      next(e)
    }
  }
}

export default ModelController;