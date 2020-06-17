//@ts-nocheck
import { LoginModelFactory } from "./loginModel.js";
import { LoginViewFactory } from './loginView.js';
import { LoginPresenterFactory } from "./loginPresenter.js"
import { LoginServiceFactory } from '../../services/loginService.js';

export class LoginBuilder {

  withAppModel(appModel){
    this.appModel = appModel;
    return this;
  }

  withDOMContainer(container){
    this.container = container;
    return this;
  }

  build(){
    if(!this.appModel || !this.container){
      throw new Error(`Some dependencies are missing, 
      application model ${this._appModel} and DOM container ${this._container}.`)
    } 

    const loginModel = LoginModelFactory.create();
    const loginView = LoginViewFactory.create();
    const loginService = LoginServiceFactory.create();
    const presenter = LoginPresenterFactory.create();

    return presenter.init({
      appModel:this.appModel, 
      container:this.container, 
      loginModel, 
      loginView, 
      loginService
    })
  }
}