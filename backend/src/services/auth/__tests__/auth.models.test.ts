import 'jest-extended';
import {ValidationError} from 'objection';
import User from '../auth.models';


describe('Authentication', () => {
    describe('Validate user schema', () => {
        test('Should returns an error if required fields are missing', () => {
            const userMock = {};
            expect(() => User.fromJson(userMock)).toThrowWithMessage(ValidationError, 
                'first_name: is a required property, ' + 
                'last_name: is a required property, ' + 
                'username: is a required property, ' +  
                'email: is a required property, ' +
                'password: is a required property, ' +
                'birthday: is a required property');
        })

        test('Should returns an error if email format is not valid', () => {
            const userMock = {
                username: 'john.smith',
                first_name: 'john',
                last_name: 'smith',
                password: 'xY123456@',
                birthday: '1990-08-01',
                email: '123'
            };
            expect(() => User.fromJson(userMock)).toThrowWithMessage(ValidationError, 
                'email: should match format "email"');
        })

        test('Should returns an error if birthday format is not valid', () => {
            const userMock = {
                username: 'john.smith',
                first_name: 'john',
                last_name: 'smith',
                password: 'xY123456@',
                birthday: '199008-01',
                email: 'john.smith@gmail.com'
            };
            expect(() => User.fromJson(userMock)).toThrowWithMessage(ValidationError, 
                'birthday: should match format "date"');
        })

        test('Should returns an error if field type is not valid', () => {
            const userMock = {
                username: 'john.smith',
                first_name: 123,
                last_name: 'smith',
                password: 'xY123456@',
                birthday: '1990-08-01',
                email: 'john.smith@gmail.com'
            };
            expect(() => User.fromJson(userMock)).toThrowWithMessage(ValidationError, 
                'first_name: should be string');
        })

        test('Should validate successfully the user object', () => {
            const userMock = {
                username: 'john.smith',
                first_name: 'john',
                last_name: 'smith',
                password: 'xY123456@',
                birthday: '1990-08-01',
                email: 'john.smith@gmail.com'
            };
            expect(() => User.fromJson(userMock)).not.toThrowError();
        })
    })
})