//@ts-nocheck

import { SCREENS } from '../../constants/screenConst.js';
import { LOGOUT } from '../../constants/eventConst.js';

class HomePresenter {
  screenName = SCREENS.HOME

  init(opt){
    if(!this._isValidInitializeObject(opt)){
      throw new Error('Invalid presenter initialization');
    }
    this._homeView = opt.homeView;
    this._appModel = opt.appModel;

    this._initView(opt.container);
    return this;
  }

  _isValidInitializeObject(opt) {
    return opt && typeof opt === 'object' 
      && opt.appModel && typeof opt.appModel.init === 'function'
      && opt.homeView && typeof opt.homeView.init === 'function'
      && opt.container && opt.container.tagName;
  }

  handleLogout = (e) => {
    this._appModel.dispatchEvent({type:LOGOUT});
  }

  _initView(container){
    this._homeView
      .init(container, {
        handleLogout:this.handleLogout, 
        username:this._appModel.userName
      })
      .render()
      .assignEvents();
  }

  destroy(){
    if(this._homeView){
      this._homeView.destroy();
    }

    this._homeView = null;
    this._appModel = null;
  }
}

export const HomePresenterFactory = {
  create: () => new HomePresenter()
}