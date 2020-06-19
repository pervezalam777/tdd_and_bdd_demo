//@ts-nocheck

import { isValidContainer, hasPropertyWithType } from '../../utils/utils.js';

const template = `
  <form id="loginForm" class="form">
    <h1 class="from-heading">Login</h1>
    <label for="username" class="form-label">User name: </label>
    <input type="text" id="username" class="form-input" required />
    <br/>
    <label for="password" class="form-label">Password: </label>
    <input type="password" id="password" class="form-input" required />
    <br/>
    <span id="error" class="error" style="display:none"></span>
    <button type="submit" id="login" class="login-btn">Login</button>
  </form>
`
class LoginView {
  _elUserName = null;
  _elPassword = null;
  _elLoginButton = null;
  _elError = null;
  
  constructor() {}

  init(container, opt) {
    if(!isValidContainer(container) || !this._isValidOptionObject(opt)) {
      throw new Error("Invalid arguments passed")
    } 
    this.container  = container;
    this.onChange = opt.handleChange;
    this.onSubmit = opt.handleSubmit;
    return this;
  }

  _isValidOptionObject(options){
    let functionsProps = ['handleChange', 'handleSubmit'];
    return hasPropertyWithType(options, functionsProps, 'function');
  }

  render(){
    this.container.innerHTML = template;

    this._elError = document.getElementById('error');
    this._elUserName = document.getElementById('username');
    this._elPassword = document.getElementById('password');
    this._elLoginButton = document.getElementById('login');

    this._elUserName.focus();
    
    return this;
  }

  assignEvents(){
    this._elUserName.addEventListener('input', this.onChange);
    this._elPassword.addEventListener('input', this.onChange);
    this._elLoginButton.addEventListener('click', this.onSubmit);

    return this;
  }

  resetForm(){
    this._elUserName.value = '';
    this._elPassword.value = '';
    
    return this;
  }

  displayError(show = false, message = ''){
    this._elError.innerText = message; 

    let display = show === true ? "block" : "none";
    this._elError.style.display = display;
    return this;
  }

  destroy() {
    if(this.container && this.container.innerHTML){
      this.container.innerHTML = '';
    }
    //Note: checking only one element existence
    //since all the other element assigned in same method call.
    if(this._elUserName != null){
      this._elUserName.removeEventListener('input', this.onChange);
      this._elPassword.removeEventListener('input', this.onChange);
      this._elLoginButton.removeEventListener('click', this.onSubmit);
      this._elLoginButton = undefined;
      this._elPassword = undefined;
      this._elUserName = undefined;
      this._elError = undefined;
    }
  }

}

export const LoginViewFactory = {
  create: () => new LoginView()
}