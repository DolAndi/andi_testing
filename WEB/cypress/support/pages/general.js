import locators from '../pageElements/locators';

class General {
  openApp() {
    cy.visit('/').as('open site');
  }
  successLogin(user) {
    cy.fixture('login').then(login => {
      const userEmailAddress = login[user + 'Email'];
      const userPassword = login[user + 'Password'];
      this.writeEmailAndPassword(userEmailAddress, userPassword);
      this.clickLoginButton();
      cy.get(locators.LOGIN.loginValidation)
        .should('exist', 'be.visible')
        .as('login validation');
    });
  }
  errorLogin(randomEmailAddress, randomPassword) {
    this.writeEmailAndPassword(randomEmailAddress, randomPassword);
    this.clickLoginButton();
    this.errorValidation('Username and password do not match any user in this service');
  }
  otherErrorLogin(data) {
    const userEmailAddress = 'test@test.com';
    const actions = {
      passwordRequired: () => {
        this.writeEmail(userEmailAddress);
        this.clickLoginButton();
        this.errorValidation('Password is required');
      },
      usernameRequired: () => {
        this.writePassword(userEmailAddress);
        this.clickLoginButton();
        this.errorValidation('Username is required');
      }
    };

    if (actions[data]) {
      actions[data]();
    }
  }
  writeEmailAndPassword(emailAddress, password) {
    cy.get(locators.LOGIN.inputEmail).type(emailAddress).as('write email');
    cy.get(locators.LOGIN.inputPassword).type(password).as('write password');
  }
  writeEmail(emailAddress) {
    cy.get(locators.LOGIN.inputEmail).type(emailAddress).as('write email');
  }
  writePassword(password) {
    cy.get(locators.LOGIN.inputPassword).type(password).as('write password');
  }
  clickLoginButton() {
    cy.get(locators.LOGIN.loginBt).click().as('click login button');
  }
  errorValidation(errorMessage) {
    cy.get(locators.LOGIN.errorValidation)
      .should('exist')
      .and('be.visible')
      .and('contain', errorMessage)
      .as('error login validation')
  }
}

export default new General();