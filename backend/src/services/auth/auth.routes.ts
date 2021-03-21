import { Router } from 'express';
import { signUpHandler, signInHandler } from './auth.handlers';
import { signInSchema, singUpSchema } from '../../validations/user';
import { schemaValidator } from '../../api/middlewares/schemaValidators';

const authRoutes = Router();

authRoutes.route('/signup').post(schemaValidator(singUpSchema, 'body'), signUpHandler);
authRoutes.route('/signin').post(schemaValidator(signInSchema, 'body'), signInHandler);

export default authRoutes;
