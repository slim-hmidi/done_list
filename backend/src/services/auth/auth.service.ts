import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import User from './auth.models';
import MainService from '../main/main.service';
import { NewUser, AuthenticationResponse } from './auth.interfaces';
import {ApiResponse, TokenPayload} from '@@types/index.d';
import { ErrorHandler } from '@api/middlewares/errorHandler';
import { httpStatuscodes, errorMessages, successMessages } from '@constants/httpUtils';
import { sign } from '@utils/index';

export default class AuthenticationService extends MainService {
    private model;

    constructor() {
      super();
      this.model = User;
    }

    public async signUp(newUser: NewUser): Promise<ApiResponse<AuthenticationResponse>> {
      try {
        const {uniqueViolationError} = httpStatuscodes;
        const saltRound = 10;
        const {
          username, firstName, lastName, email, birthday, password,
        } = newUser;

        // check user's existence
        const existantUser = await this.model.query()
          .where((builder) => builder.where('email', email).orWhere('username', username))
          .first();

        if (existantUser) {
          throw new ErrorHandler(
            uniqueViolationError,
            errorMessages.userExists,
          );
        }

        const salt = genSaltSync(saltRound);
        const hash = hashSync(password, salt);

        const createdUser = await this.model.query().insert({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hash,
          username,
          birthday,
        });

        createdUser.password = '';

        const payload: TokenPayload = {
          id: createdUser.id,
          username,
          email,
        };

        const token = await sign(payload);
        return {
          message: successMessages.userCreationSuccess,
          data: {
            userId: createdUser.id,
            username,
            token: token as string,
          },
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    public async signIn(username: string, password: string): Promise<ApiResponse<AuthenticationResponse>> {
      try {
        const {forbidden} = httpStatuscodes;
        const fetchedUser = await this.model.query().findOne({ username });
        if (!fetchedUser) {
          throw new ErrorHandler(forbidden, errorMessages.invalidUsername);
        }

        const validPasswod = compareSync(password, fetchedUser.password);
        if (!validPasswod) {
          throw new ErrorHandler(forbidden, errorMessages.wrongPassword);
        }
        const payload: TokenPayload = {
          id: fetchedUser.id,
          username,
          email: fetchedUser.email,
        };

        const token = await sign(payload);
        return {
          message: successMessages.signInSuccess,
          data: {
            userId: fetchedUser.id,
            username,
            token: token as string,
          },
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    public async isExistentUser(id: number): Promise<boolean> {
      try {
        const fetchedUser = await this.model.query().findById(id);
        return !!fetchedUser;
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }
}
