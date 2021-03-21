import { Router } from 'express';
import getAllTags from '../../controllers/tags';

const tagRoutes = Router();

tagRoutes.route('/').get(getAllTags);

export default tagRoutes;
