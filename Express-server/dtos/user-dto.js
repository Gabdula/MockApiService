class UserDto {
  user;
  email;
  id;
  isActivated;
  role;

  constructor(model) {
    this.user = model.rows[0].login;
    this.email = model.rows[0].email;
    this.id = model.rows[0].user_id;
    this.isActivated = model.rows[0].isactivated;
    this.role = model.rows[0].role
  }
}

export default UserDto;
