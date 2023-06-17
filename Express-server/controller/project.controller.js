import ProjectService from '../service/project-service.js';
import ApiError from '../exceptions/api-error.js';
const projectService = new ProjectService();

class ProjectController {
  async GetUserProject(req, res, next) {
    try {
      const { id } = req.params;
      const userProjects = await projectService.getUserProject(id);
      return res.json(userProjects.rows);   
    } catch (e) {
      next(e); 
    }
  }
  async CreateUserProject(req, res, next) {
    try {
      const { project_name, user_id, prefix_api } = req.body;
      await projectService.createProject(project_name, user_id, prefix_api);
      return res.json('Success');
    } catch (e) {
      next(e); 
    }
  }
  async CloneUserProject(req, res, next) {
    try {
      const { project_id, user_id } = req.body;
      await projectService.cloneUserProject(project_id, user_id)
      return res.json('Success');
    } catch (e) {
      next(e);  
    }
  }
  async EditUserProject(req, res, next) {
    try {
      const { project_id, project_name, prefix_api } = req.body;
      await projectService.editUserProject(project_id, project_name, prefix_api);
      return res.json('Success');
    } catch (e) {
      next(e); 
    }
  }
  async DeleteUserProject(req, res, next) {
    try {
      const { id } = req.params;
      await projectService.deleteUserProject(id);
      return res.json('Success');
    } catch (e) {
      next(e); 
    }
  }
}

export default ProjectController;
