import client from '../db.js';

class ProjectService {
  async getUserProject(userId) {
    const projectsInfo = await client.query(
      `select project_name, date_create, isactive, prefix_api 
      from public.project where project_owner = $1`,
      [userId],
    );
    return projectsInfo;
  }
  async createProject(projectName, userId, prefix = null) {
    await client.query(
      `insert into public.project (project_name, project_owner, prefix_api) 
      values ($1, $2, $3)`,
      [projectName, userId, prefix],
    );
  }
  async cloneUserProject(project_id) {
    await client.query(
      `insert into public.project (project_name, project_owner, prefix_api) 
      select project_name, project_owner, prefix_api from public.project 
      where project_id = $1`,
      [project_id],
    );
  }
  async editUserProject(project_id, project_name, prefix_api = null) {
    await client.query(
      `update public.project set project_name = $1, prefix_api = $2 
      where project_id = $3`,
      [project_name, prefix_api, project_id],
    );
  }
  async deleteUserProject(project_id) {
    await client.query(
      `delete from public.project where project_id = $1`,
      [project_id], 
    );
  }
}

export default ProjectService;
