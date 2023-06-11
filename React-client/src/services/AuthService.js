import $api from '../http';

export default class AuthService {
  static async login(login, password) {
    return await $api.post('/user/login', { login, password });
  }

  static async registration(login, email, password) {
    const res = await $api.post('/user/registration', { login, email, password });
    return res
  }

  static async logout() {
    return await $api.post('/user/logout');
  }
}
