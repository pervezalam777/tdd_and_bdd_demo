//@ts-nocheck
import { SCREENS } from '../../constants/screenConst.js'
class LoginPresenter {
  screenName = SCREENS.LOGIN
  
  constructor(){ }

  init(opt){
    if(!this._isValidInitializeObject(opt)){
      throw new Error('Invalid presenter initialization');
    }
    this._appModel = opt.appModel;
    this._loginModel = opt.loginModel;
    this._loginView = opt.loginView;
    this._loginService = opt.loginService;

    this._loginModel.init();
    this._initView(opt.container);
    return this;
  }

  handleChange = (e) => {
    this._loginModel[e.target.id] = e.target.value;

    //NOTE: No validation applied on login for based on user input as of now. 
    // It might only be required username as email id and password policy applied.
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let credential = this._loginModel.credential;
    try {
      this._appModel.userDetails = await this._loginService.doLogin(credential);
      this._appModel.dispatchEvent({type:LOGIN_SUCCESS});
    } catch(e){
      console.log(e);
      this._loginView.displayError(true, e.message);
    }
  }

  _initView(container){
    this._loginView
      .init(container, {
        handleChange: this.handleChange, 
        handleSubmit: this.handleSubmit
      })
      .render()
      .assignEvents();
  }

  _isValidInitializeObject(opt) {
    return opt && typeof opt === 'object' 
      && opt.appModel && typeof opt.appModel.init === 'function'
      && opt.loginModel && typeof opt.loginModel.init === 'function'
      && opt.loginView && typeof opt.loginView.init === 'function'
      && opt.loginService && typeof opt.loginService.doLogin === 'function'
      && opt.container && opt.container.tagName;
  }

  destroy() {
    //NOTE: Only login model is checked since other will exists too.
    if(this._loginModel){
      this._loginView.destroy();
      this._loginModel.destroy();
    }
    
    this._appModel = undefined;
    this._loginModel = undefined;
    this._loginView = undefined;
    this._loginService = undefined;
  }
}

export const LoginPresenterFactory = {
  create: () => new LoginPresenter()
}