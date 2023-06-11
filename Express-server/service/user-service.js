import client from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../exceptions/api-error.js';
import MailService from './mail-service.js';
import TokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import bcrypt from 'bcrypt';

const mailService = new MailService();
const tokenService = new TokenService();

class UserService {
  //Создание пользователя
  async createUser(login, email, password) {
    //Проверка на существование пользователя
    const usersExist = await client.query(
      `select exists (select * from public.user where login = $1 or email = $2)`,
      [login, email],
    );
    if (usersExist.rows[0].exists) { 
      throw ApiError.BadRequest('Пользователь с такой почтой или логином уже существует');
    }
    //Хаширование пароля
    const hashPassword = await bcrypt.hash(password, 3);
    //Создание строки авторизаци
    const activationLink = uuidv4();
    //Отправка подтверждения на почту 
    try {
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/user/activate/${activationLink}`,
      );
    } catch (e) {
      throw ApiError.InternalServer('Некорректная почта')
    }
    //Добавление пользователя в бд
    const user = await client.query(
      `insert into public.user (login, email, password, activationlink) values ($1, $2, $3, $4) returning *`,
      [login, email, hashPassword, activationLink],
    );
    //Генерация токина
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto }); 

    return { ...tokens, userDto }; 
  }

  async activate(activationLink) {
    const user = await client.query(
      `select exists (select * from public.user where activationlink = $1)`,
      [activationLink],
    );
    if (!user.rows[0].exists) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    const activateUser = await client.query(
      `update public.user set isactivated = 'true' where activationlink = $1`,
      [activationLink],
    );
  }

  async login(login, password) {
    const user = await client.query(
      `select * from public.user as u where u.email = $1 or u.login = $1`,
      [login],
    );   
    if (user.rows[0] === undefined) {
      throw ApiError.BadRequest('Пользователь с таким логином не найден.')
    }
    const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
    if(!isPassEquals){
      throw ApiError.BadRequest('Неверный пароль.')
    }
    const userActivated = await client.query(
      `select isactivated from public.user as u where u.email = $1 or u.login = $1`,
      [login],
    );
    if(!userActivated.rows[0].isactivated){
      throw ApiError.BadRequest('Аккаунт не активирован.')
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto})
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDb){
      throw ApiError.UnauthorizedError(); 
    }

    const user = await client.query(
      `select * from public.user where user_id = $1`,
      [userData.id]
    )
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto})
    
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async getAllUsers() {
    const users = await client.query(`select * from public.user`);
    return users.rows;
  }
}

export default UserService;
