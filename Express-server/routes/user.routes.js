import Router from 'express';
import UserController from '../controller/user.controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

const userController = new UserController();
const routerUser = new Router();

routerUser.post( 
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  userController.createUser,
);
routerUser.post('/login', userController.loginUser);
routerUser.post('/logout', userController.logout);
routerUser.get('/activate/:link', userController.activate);
routerUser.get('/refresh', userController.refresh);
routerUser.get('/users', authMiddleware, userController.getUsers);
routerUser.delete('/user/:id', userController.deleteUser);





export default routerUser;
