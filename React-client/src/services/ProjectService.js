import $api from '../http';

export default class ProjectService {
  static async getUserProjects(userID) {
    return await $api.get(`/proj/getProjects/${userID}`);
  }

  static async createProject(project_name, user_id, prefix_api) {
    return await $api.post('/proj/createProject', { project_name, user_id, prefix_api });
  }

  static async cloneProject(project_id, user_id) {
    return await $api.post('/proj/cloneProject', { project_id, user_id });
  }

  static async editProject(project_id, project_name, prefix_api) {
    return await $api.put('/proj/editProject', { project_id, project_name, prefix_api });
  }

  static async deleteProject(project_id) {
    return await $api.delete(`/proj/deleteProject/${project_id}`);
  }
}
