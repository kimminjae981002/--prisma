import express from 'express';
import cookieParser from 'cookie-parser';
// import { SERVER_PORT } from './constants/app.constant.js';
import { apiRouter } from './routers/index.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log(`3000포트로 서버가 실행됐습니다.`);
});
