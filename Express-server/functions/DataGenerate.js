import { fakerRU, faker } from '@faker-js/faker';

export default class functionDataGenerate {
  dataGenerate = (schema, lang) => {
    var language;
    switch (lang) {
      case "en":
        language = faker;
        break;
      case "ru":
        language = fakerRU;
        break;
      default:
        language = faker;
        break;
    }
    let model = {};
    const separateObject = (obj) => {
      let modelTemp = {}
      for (var key of Object.keys(obj)) {
        if (typeof obj[key] === 'object'){
          let tempObject = {}
          tempObject = separateObject(obj[key])
          modelTemp[key] = tempObject
        } else {
          const separateValue = obj[key].split('.')
          modelTemp[key] = language[`${separateValue[0]}`][`${separateValue[1]}`]();
        }
      }
      return modelTemp
    }
    for (var key of Object.keys(schema)) {
      if (typeof schema[key] === 'object'){
        let tempObject = {}
        tempObject = separateObject(schema[key])
        model[key] = tempObject
      } else {
        const separateValue = schema[key].split('.');
        model[key] = language[`${separateValue[0]}`][`${separateValue[1]}`]();
      }
    }
    return model
  }
}

// {
//   "id_project": "0bb98ee5-15bc-4c5d-9898-55b05def18e1", 
//   "model_name": "/api", 
//   "count_record": "3",
//   "schema": {
//       "username0" : "internet.userName",
//       "username1" : "internet.userName",
//       "username2" : {
//           "user1" : "internet.userName",
//           "user2" : "internet.userName",
//           "user3" : {
//               "u1" : "internet.userName",
//               "u2" : "internet.userName",
//               "u3" : {
//                   "3" : "internet.userName"
//               }
//           }
//       },
//       "username3": "internet.userName"
//   }
// }
