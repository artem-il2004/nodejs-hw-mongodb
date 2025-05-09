import express from "express";
import cors from "cors"; 
// import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import {logger} from "./middlewares/logger.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import  contactsRouter  from './routes/contacts.js';
import authRouter from "./routes/auth.js";
import cookieParser from 'cookie-parser';
 import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from "./middlewares/swaggerDocs.js";
export const setupServer = () => {
    const app = express();
    
    
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

     app.use(logger);
    app.use('/auth', authRouter); 
    app.use('/contacts', contactsRouter); 
    app.use('/uploads', express.static(UPLOAD_DIR));
    //если пользователь попал по маршруту /contacts искать как его проводить через middleware в contactsRouter
    
    

    app.use(notFoundHandler);
    app.use(errorHandler);

    const port = Number(getEnvVar("PORT",3000));
    app.listen(port, () => console.log(`Server started on ${port} port and at ${new Date().toLocaleString()}`));
};