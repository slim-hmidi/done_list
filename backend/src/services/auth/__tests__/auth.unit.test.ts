import AuthenticationService from '../auth.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { ErrorHandler } from 'api/middlewares/errorHandler';
import { httpStatuscodes, errorMessages, successMessages } from 'constants/httpUtils';

const {forbidden, uniqueViolationError} = httpStatuscodes;
const {userExists, invalidUsername, wrongPassword} = errorMessages;

let mockSignUp = jest.fn();
let mockSignIn = jest.fn();
jest.mock('../auth.service', () => {
    return jest.fn().mockImplementation(() => {
        return {signUp: mockSignUp, signIn: mockSignIn};
    })
});


describe('AuthenticationService', () => {
    beforeEach(() => {
        
    })
    describe('SignUp', () => {
        test('Should return an error if user exists', async () => {
            mockSignUp = jest.fn().mockImplementation(() => { throw new ErrorHandler(
                uniqueViolationError,
                userExists,
              )});
            const userMock = {
                username: 'john.smith',
                firstName: 'john',
                lastName: 'smith',
                password: 'xY123456@',
                birthday: '1990-08-01',
                email: 'john.smith@gmail.com'
            };

            const auth = new AuthenticationService();
            expect(() => auth.signUp(userMock)).toThrowError(userExists);
        })


        test('Should create a user successfully', async () => {
            const password = 'xY123456@';
            const salt = genSaltSync(10);
            const hash = hashSync(password, salt);
            const userMock = {
                username: 'john.smith',
                firstName: 'john',
                lastName: 'smith',
                password: hash,
                birthday: '1990-08-01',
                email: 'john.smith@gmail.com'
            };
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
            "eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImpvaG4uc21pdGgiLCJlbWF" + 
            "pbCI6ImpvaG4uc21pdGhAZ21haWwuY29tIn0.kl478-S4-DMpkJ" + 
            "1TcUl5cD2oU9ePb6hHgW07Zcqij1s";

            const expected = {
                message: successMessages.userCreationSuccess,
                data: {
                    userId: 1,
                    username: userMock.username,
                    token
                }
            }

            mockSignUp = jest.fn().mockResolvedValue(expected);

            const auth = new AuthenticationService();
            const response = await auth.signUp(userMock);
            expect(response).toEqual(expected);
        })
    })


    describe('SignIn', () => {
        test('Should throw an error if the username is wrong', () => {
            mockSignIn = jest.fn().mockImplementation(() => { throw new ErrorHandler(forbidden,
                invalidUsername);});
            const userMock = {
                username: 'alex.tx',
                password: 'xY123456@',
            };

            const auth = new AuthenticationService();
            expect(() => auth.signIn(userMock.username, userMock.password)).toThrowError(invalidUsername);
        })

        test('Should throw an error if the password is not valid', () => {
            mockSignIn = jest.fn().mockImplementation(() => { throw new ErrorHandler(forbidden,
                wrongPassword)});
            const userMock = {
                username: 'alex.tx',
                password: '123',
            };

            const auth = new AuthenticationService();
            expect(() => auth.signIn(userMock.username, userMock.password)).toThrowError(wrongPassword);
        })


        test('Should signIn successfully when the credentials are valid', async () => {
            const userMock = {
                username: 'john.smith',
                password: 'xY123456@',
            };
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
            "eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImpvaG4uc21pdGgiLCJlbWF" + 
            "pbCI6ImpvaG4uc21pdGhAZ21haWwuY29tIn0.kl478-S4-DMpkJ" + 
            "1TcUl5cD2oU9ePb6hHgW07Zcqij1s";
            const expected = {
                message: successMessages.userCreationSuccess,
                data: {
                    userId: 1,
                    username: userMock.username,
                    token
                }
            }
            mockSignIn = jest.fn().mockResolvedValue(expected);
            

            

            const auth = new AuthenticationService();
            const response = await  auth.signIn(userMock.username, userMock.password);
            expect(response).toEqual(expected);
        })
    })
})