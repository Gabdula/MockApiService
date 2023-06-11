import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import client from '../db.js';

dotenv.config();

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    console.log(userId)
    console.log(refreshToken)
    //Проверка на существование токена в бд
    const tokenExist = await client.query(
      `select exists (select * from public.token where user_id = $1)`,
      [userId],
    );
    //Перезаписывание токена
    if (tokenExist) {
      const editToken = await client.query(
        `update public.token set refreshToken = $1 where user_id = $2`,
        [refreshToken, userId],
      );
    }
    //Создание токина пользователя
    const token = await client.query(
      `insert into public.token (user_id, refreshToken) values ($1, $2) returning *`,
      [userId, refreshToken],
    );

    return token;  
  }

  async removeToken(refreshToken) {
    const tokenData = await client.query(
      `delete from public.token where refreshtoken = $1`,
      [refreshToken],
      );
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await client.query(
      `select * from public.token where refreshtoken = $1`,
      [refreshToken],
      );
    return tokenData;
  }
}

export default TokenService;
