//@ts-nocheck
let loginPage = require('../pages/loginPage');

describe("Login page", function(){
  it('should show error on invalid login', function(){
      loginPage.get("http://localhost:3000");
      loginPage.enterUsername('invaliduser');
      loginPage.enterPassword('invalidpassword');
      loginPage.clickLogin();

      loginPage.verifyError('Invalid credential');
  });

  it('should show error "bad request" if no argument provided', function(){
    loginPage.get("http://localhost:3000");
    loginPage.enterUsername('');
    loginPage.enterPassword('');
    loginPage.clickLogin();

    loginPage.verifyError('bad request');
  });

  it('should show error invalid login if username is valid but password is invalid', function(){
    loginPage.get("http://localhost:3000");
    loginPage.enterUsername('pervez');
    loginPage.enterPassword('invalidPassword');
    loginPage.clickLogin();

    loginPage.verifyError('Invalid credential');
  });

  it('should show error invalid login if password is valid but username is invalid', function(){
    loginPage.get("http://localhost:3000");
    loginPage.enterUsername('Alam');
    loginPage.enterPassword('password123');
    loginPage.clickLogin();

    loginPage.verifyError('Invalid credential');
  });

  it('should move to dashboard if username and password is valid', function(){
    loginPage.get("http://localhost:3000");
    loginPage.enterUsername('pervez');
    loginPage.enterPassword('password123');
    loginPage.clickLogin();

    loginPage.verifySuccess();
  });
})