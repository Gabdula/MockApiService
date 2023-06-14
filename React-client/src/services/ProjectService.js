import $api from '../http';

export default class ProjectService {
  static async getUserProjects(userID) {
    return await $api.get(`/proj/getProjects/${userID}`);
  }

  static async createProject(projectName, userID, prefixApi) {
    return await $api.get('/proj/createProject', { projectName, userID, prefixApi });
  }

  static async cloneProject(projectID) {
    return await $api.get('/proj/cloneProject', { projectID });
  }

  static async editProject(projectID, projectName, prefixApi) {
    return await $api.get('/proj/editProject', { projectID, projectName, prefixApi });
  }

  static async deleteProject(projectID) {
    return await $api.get('/proj/deleteProject', { projectID });
  }
}
