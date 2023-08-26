import { response } from 'express';
import client from '../db.js';
import ApiError from '../exceptions/api-error.js';
import functionDataGenerate from '../functions/DataGenerate.js';
const funcDataGenerate = new functionDataGenerate();

class ModelService {
  async getProjectModel() {}

  async createProjectModel(idProject, modelName, countRecord, Schema) {
    let jsonObject = [];
    for (let i = 0; i < countRecord; i++) {
      let tempObject = {};
      tempObject = funcDataGenerate.dataGenerate(Schema, 'ru');
      jsonObject.push(tempObject);
    }

    await client.query(
      `insert into public.model (model_json, model_name, project_id) 
      values ($1, $2, $3)`,
      [JSON.stringify(jsonObject), modelName, idProject],
    );
    return jsonObject;
  }

  async getModels(project_id) {
    const models = await client.query(
      `select * from public.model where project_id = $1`,
      [project_id]
    )
    return models.rows;
  }

  async testService(project_id, params) {
    let model;
    let response = await client.query(
      `select binding_model from public.model where project_id = $1 and model_name = $2`,
      [project_id, params[0]],
    );
    if (response.rows[0].binding_model !== null) {
      throw ApiError.BadRequest('Not found');
    }
    if (params.length > 1) {
      for (let i = 0; i < params.length; i += 2) {
        if (i > 0) {
          let childBindingId = await client.query(
            `select binding_model from public.model where project_id = $1 and model_name = $2`,
            [project_id, params[i]],
          );
          let parentId = await client.query(
            `select model_id from public.model where project_id = $1 and model_name = $2`,
            [project_id, params[i-2]],
          );
          if (parentId.rows[0].model_id !== childBindingId.rows[0].binding_model) {
            throw ApiError.BadRequest('Not found');
          }
        }
        model = {};
        model = await client.query(
          `select model_json from public.model where project_id = $1 and model_name = $2`,
          [project_id, params[i]],
        );

        if (model.rows[0].model_json[params[1] - 1]) {
          model = model.rows[0].model_json[params[1] - 1];
        } else {
          throw ApiError.BadRequest('Not found');
        }
      }
    } else {
      let response = await client.query(
        `select model_json from public.model where project_id = $1 and model_name = $2`,
        [project_id, params[0]],
      );
      if (response.rows[0]) {
        model = response.rows[0].model_json;
      } else {
        throw ApiError.BadRequest('Not found');
      }
    }
    return model;
  }

  async checkPrefix(project_id, prefix) {
    const prefixApi = await client.query(
      `select prefix_api from public.project where project_id = $1 and prefix_api = $2`,
      [project_id, prefix],
    );
    const modelName = await client.query(
      `select model_name from public.model where project_id = $1 and model_name = $2`,
      [project_id, prefix],
    );

    if (prefixApi.rows[0]) {
      return false;
    }
    if (modelName.rows[0]) {
      return true;
    }
    if (prefix === undefined) {
      return false;
    }
  }
}

export default ModelService;
