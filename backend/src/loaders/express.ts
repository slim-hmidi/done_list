import '../utils/env';
import { Express, Request, Response } from 'express';
import {json} from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../api/routes';
import { notFound, errorHandlerMiddleware } from '../api/middlewares/errorHandler';


const expressLoader = (app: Express) => {
    // Health check endpoints
    app.get('/status', (req: Request, res: Response) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
      });

    // Enable Cross-origin 
    app.use(cors())

    app.use(json());
    app.use(helmet());
    app.use('/', routes);


    // middlewares
    app.use(notFound);
    app.use(errorHandlerMiddleware);
};

export default expressLoader;



