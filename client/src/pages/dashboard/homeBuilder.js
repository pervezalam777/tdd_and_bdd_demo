//@ts-nocheck
import { HomeViewFactory } from './homeView.js';
import { HomePresenterFactory } from "./homePresenter.js"

export class HomeBuilder {

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

    const homeView = HomeViewFactory.create();
    const presenter = HomePresenterFactory.create();

    return presenter.init({
      appModel:this.appModel, 
      container:this.container,
      homeView
    })
  }
}