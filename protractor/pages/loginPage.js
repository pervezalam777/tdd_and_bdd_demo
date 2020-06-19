//@ts-nocheck
function LoginPage(){
  let username_input = element(by.id('username'));
  let password_input = element(by.id('password'));
  let loginButton = element(by.id('login'));

  this.get = function(url) {
    browser.waitForAngularEnabled(false);
    browser.get(url);
  }

  this.enterUsername = function(value){
    username_input.sendKeys(value);
  }

  this.enterPassword = function(value){
    password_input.sendKeys(value)
  }

  this.clickLogin = function(){
    loginButton.click();
  }

  this.verifyError = function(result){
      let output = element(by.id('error', result));
      expect(output.getText()).toEqual(result);
  }

  this.verifySuccess = function(){
    let output = element(by.id('logout'));
    expect(output).toBeTruthy();
  }
}

module.exports = new LoginPage();