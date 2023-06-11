import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import projectRouter from './routes/project.routes.js';
import routerUser from './routes/user.routes.js';
import modelRouter from './routes/model.routes.js';
import errorMiddleware from './middlewares/error-middleware.js';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors(
  {
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus:200
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    }),
    );
    app.use(bodyParser.json());

app.use('/proj', projectRouter);
app.use('/user', routerUser);
app.use('/model', modelRouter);

app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
