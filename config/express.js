import httpModule from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import createExpressGateway from '#infrastructure/express.js';

const app = express();
const http = httpModule.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());    
app.use(helmet());      
app.use(cookieParser());

const router = await createExpressGateway();
app.use('/', router);

export default http;