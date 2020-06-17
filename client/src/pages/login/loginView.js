//@ts-nocheck
const template = `
  <form id="loginForm" class="form">
    <h1 class="from-heading">Login</h1>
    <label for="username" class="form-label">Username: </label>
    <input type="text" id="username" class="form-input" required />
    <br/>
    <label for="password" class="form-label">password: </label>
    <input type="password" id="password" class="form-input" required />
    <span class>(should be 8 character long, 1 Uppercase, 1 lowercase, 1 special character required.)
    <br/>
    <span id="error" class="error" style="display:none"></span>
    <button type="submit" id="login">Login<button>
  </form>
`
class LoginView {
  _elUserName = null;
  _elPassword = null;
  _elLoginButton = null;
  _elError = null;
  
  constructor() {}

  init(container, opt) {
    if(this.isValidContainer(container) && this.isValidOptionObject(opt)) {
      this.container  = container;
      this.onChange = opt.handleChange;
      this.onSubmit = opt.handleSubmit;
      return this;
    } 
    throw new Error("Invalid arguments passed")
  }

  isValidContainer(container){
    return (container && container.tagName && container.tagName === "DIV")
  }

  isValidOptionObject(options){
    let functionsProps = ['handleChange', 'handleSubmit'];
    if(options && typeof options === 'object'){
      for(let item of functionsProps){
        if(!options[item] && !(typeof options[item] === 'function')){
          return false;
        }
      }
      return true;
    }
    return false;
  }

  render(){
    this.container.innerHTML = template;
    this._elError = document.getElementById('error');
    return this;
  }

  assignEvents(){
    this._elUserName = document.getElementById('username');
    this._elUserName.addEventListener('change', this.onChange);

    this._elPassword = document.getElementById('password');
    this._elPassword.addEventListener('change', this.onChange);

    this._elLoginButton = document.getElementById('login');
    this._elLoginButton.addEventListener('click', this.onSubmit);
  }

  resetForm(){
    this._elUserName = '';
    this._elPassword = '';
    return this;
  }

  displayError(show = false, message){
    return this;
  }

  destroy() {
    if(this.container && this.container.innerHTML){
      this.container.innerHTML = '';
    }
    //Note: checking only one element existence
    //since all the other element assigned in same method call.
    if(this._elUserName != null){
      this._elUserName.removeEventListener('change', this.onChange);
      this._elPassword.removeEventListener('change', this.onChange);
      this._elLoginButton.removeEventListener('click', this.onSubmit);
      this._elLoginButton = undefined;
      this._elPassword = undefined;
      this._elUserName = undefined;
    }
    this._elError = undefined;
  }

}

export const LoginViewFactory = {
  create: () => new LoginView()
}