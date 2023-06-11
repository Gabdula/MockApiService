import ModelService from "../service/model.service.js";
import functionDataGenerate from '../functions/DataGenerate.js'
const modelService = new ModelService();
const dataGenerate = new functionDataGenerate();

class ModelController {
  async GetProjectModel(req, res){
    try {
      
    } catch (e) {
      console.log(e);
    }
  }
  async CreateProjectModel(req, res){
    try {
      const {idProject, modelName, countRecord, Schema} = req.body;
      dataGenerate.choiceLanguage("ru");
      const model = await modelService.createProjectModel(idProject, modelName, countRecord, Schema);
      // return res.json('Success');
      return res.json(model);
    } catch (e) {
      console.log(e);
    }
  }
}

// {
//   "Name": "Name",
//   "Count": "5",
//   "Schema": [
//       {
//           "name": "idProject",
//           "type": "numberBigInt"
//       },
//               {
//           "name": "fullname",
//           "type": "locationCountry"
//       },
//               {
//           "name": "image",
//           "type": "internetEmail"
//       }
//   ]
// }

export default ModelController;