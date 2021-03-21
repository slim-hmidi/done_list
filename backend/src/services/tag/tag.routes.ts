import { Router } from 'express';
import getAllTagsHandler from './tag.handlers';

const tagRoutes = Router();

tagRoutes.route('/').get(getAllTagsHandler);

export default tagRoutes;
