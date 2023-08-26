import $api from '../http';

export default class ModelService {
  static async getModels(project_id) {
    return await $api.get(`/model/${project_id}`);
  }
}
