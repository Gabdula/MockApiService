import client from '../db.js';
import functionDataGenerate from '../functions/DataGenerate.js';
const dataGenerate = new functionDataGenerate();

class ModelService {
  async getProjectModel() {}

  async createProjectModel(idProject, modelName, countRecord, Schema) {
    var jsonObject = [];
    for (let i = 0; i < countRecord; i++) {
      var tempObject = {};
      for (let j = 0; j < Schema.length; j++) {
        tempObject[Schema[j].name] = dataGenerate[`${Schema[j].type}`]();
      } 
      jsonObject.push(tempObject); 
    }
    
    await client.query(
      `insert into public.model (model_json, model_name, project_id) 
      values ($1, $2, $3)`,
      [JSON.stringify(jsonObject), modelName, idProject],
    );
  }
}

export default ModelService;
