//@ts-nocheck
class LoginModel {
  _username = '';
  _password = '';
  _errorMessage = '';
  
  constructor(){ }
  
  init(){}

  set username(value) { 
    if(value && typeof value === 'string'){
      this._username = value; 
    }
  }
  set password(value){ 
    if(value && typeof value === 'string'){
      this._password = value;
    }
  }
  
  get credential(){
    if(this._username !== '' && this._password !== ''){
      return JSON.stringify({
        username:this._username, 
        password:this._password
      });
    }
    return null;
  }

  get error() {
    return this._errorMessage;
  }

  set error(value) {
    if(value && typeof value === 'string'){
      this._errorMessage = value;
    }
  }

  destroy() {
    this._username = undefined;
    this._password = undefined;
    this._errorMessage = undefined;
  }
}

export const LoginModelFactory = {
  create: () => new LoginModel()
}