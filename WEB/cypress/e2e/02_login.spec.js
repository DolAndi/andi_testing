import cy from '../support/pages/general'
import { faker } from '@faker-js/faker'
const fakerbr = require('faker-br');

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();

const randomEmailBR = fakerbr.internet.email();

describe('Login', () => {
    beforeEach(() => {
        cy.openApp()
    });
    it('01 - Login succesfully', () => {
        cy.successLogin('user')
    });
    it('02 - Login unsuccessfully - faker js', () => {
        cy.errorLogin(randomEmail, randomPassword)
    });
    it('03 - Login unsuccessfully - faker br', () => {
        cy.errorLogin(randomEmailBR, randomPassword)
    });
    it('04 - Login unsuccessfully - password is required', () => {
        cy.otherErrorLogin('passwordRequired')
    });
    it('05 - Login unsuccessfully - username is required', () => {
        cy.otherErrorLogin('usernameRequired')
    });
});