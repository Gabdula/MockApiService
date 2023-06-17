import client from '../db.js';
import functionDataGenerate from '../functions/DataGenerate.js';
const funcDataGenerate = new functionDataGenerate()


class ModelService {
  async getProjectModel() {}

  async createProjectModel(idProject, modelName, countRecord, Schema) {
    var jsonObject = [];
    for (let i = 0; i < countRecord; i++) {
      var tempObject = {};
      tempObject = funcDataGenerate.dataGenerate(Schema, 'ru')
      jsonObject.push(tempObject); 
    }
    
    await client.query(
      `insert into public.model (model_json, model_name, project_id) 
      values ($1, $2, $3)`,
      [JSON.stringify(jsonObject), modelName, idProject],
    );
    return jsonObject
  }
}

export default ModelService;
