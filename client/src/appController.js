//@ts-nocheck
import { LoginBuilder } from './pages/login/loginBuilder.js';
import { AppModelFactory } from './model/appModel.js';
import { LOGIN_SUCCESS, LOGOUT } from './constants/eventConst.js'
import { SCREENS } from './constants/screenConst.js'

//NOTE: There could be dynamic implementation of adding and removing screens
// similar each screen (page) can register or unregister events

export class ApplicationController {
  
  _appModel = null;
  _currentScreen = null;

  constructor(){
    this._container = document.getElementById('main');
    this._appModel = AppModelFactory.create();
  }

  init(){
    this._appModel.init();
    this.changeScreen(SCREENS.LOGIN);
  }

  changeScreen(screenName){
    switch(screenName){
      case SCREENS.LOGIN:
        this.buildLoginPage();
        break;
      case SCREENS.HOME:
        this.buildHomePage();
        break;
      default:
        this.buildLoginPage();
    }
    this.registerListeners(screenName);
  }

  destroyPreviousScreen(screenName){
    this.unregisterListeners(screenName);
    this._currentScreen.destroy();
  }

  handleUserLoggedIn = () => {
    //NOTE: not screen transition as per the implementation.
    this.destroyPreviousScreen(this._currentScreen.screenName)
    this.changeScreen(SCREENS.HOME);
  }

  buildLoginPage(){
    this.builder(LoginBuilder);
  }

  async buildHomePage(){
    const { HomeBuilder } =  await import('./pages/dashboard/homeBuilder.js')
    this.builder(HomeBuilder);
  }

  builder(classRef){
    const builder = new classRef();
    this._currentScreen = builder
                            .withAppModel(this._appModel)
                            .withDOMContainer(this._container)
                            .build();
  }

  handleLogout = () => {
    this.destroyPreviousScreen(this._currentScreen);
    this.changeScreen(SCREENS.LOGIN);
  }

  registerListeners(screenName){
    switch(screenName){
      case SCREENS.LOGIN:
        this._appModel.registerListener(LOGIN_SUCCESS, this.handleUserLoggedIn)
        break;
      case SCREENS.HOME:
        this._appModel.registerListener(LOGOUT, this.handleLogout)
        break;
      default:
        throw new Error('Please specify screen name')
    }
  }

  unregisterListeners(screenName){
    switch(screenName){
      case SCREENS.LOGIN:
        this._appModel.removeListener(LOGIN_SUCCESS, this.handleUserLoggedIn)
        break;
      case SCREENS.HOME:
        this._appModel.removeListener(LOGOUT, this.handleLogout)
        break;
      default:
        throw new Error('Please specify screen name')
    }
  }
}