import ProjectService from '../service/project-service.js';
const projectService = new ProjectService();

class ProjectController {
  async GetUserProject(req, res) {
    try {
      const { id } = req.params;
      const userProjects = await projectService.getUserProject(id);
      return res.json(userProjects.rows);   
    } catch (e) {
      console.log(e);
    }
  }
  async CreateUserProject(req, res) {
    try {
      const { project_name, user_id, prefix_api } = req.body;
      await projectService.createProject(project_name, user_id, prefix_api);
      return res.json('Success');
    } catch (e) {
      console.log(e);
    }
  }
  async CloneUserProject(req, res) {
    try {
      const { project_id } = req.body;
      await projectService.cloneUserProject(project_id)
      return res.json('Success');
    } catch (e) {
      console.log(e); 
    }
  }
  async EditUserProject(req, res) {
    try {
      const { project_id, project_name, prefix_api } = req.body;
      await projectService.editUserProject(project_id, project_name, prefix_api);
      return res.json('Success');
    } catch (e) {
      console.log(e);
    }
  }
  async DeleteUserProject(req, res) {
    try {
      const { project_id } = req.body;
      await projectService.deleteUserProject(project_id);
      return res.json('Success');
    } catch (e) {
      console.log(e);
    }
  }
}

export default ProjectController;
