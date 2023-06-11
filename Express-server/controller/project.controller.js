import ProjectService from '../service/project-service.js';
const projectService = new ProjectService();

class ProjectController {
  async GetUserProject(req, res) {
    try {
      const { user_id } = req.body;
      // const allProjects = await client.query(
      //   `select p.project_id, p.project_name, p.project_owner, p.date_create, p.isactive from public.project as p 
      //                                         left join public.user_project as up on up.project_id = p.project_id 
      //                                         left join public.user as u on u.user_id = up.user_id 
      //                                         where up.user_id = $1`,
      //   [user_id],
      // );
      const userProjects = await projectService.getUserProject(user_id);
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
