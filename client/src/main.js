//@ts-nocheck
import { LoginBuilder } from './pages/login/loginBuilder.js';
import { AppModelFactory } from './model/appModel.js';

const container = document.getElementById('main');
const appModel = AppModelFactory.create();

function main(){
  appModel.init();

  const builder = new LoginBuilder();
  appModel.currentScreen = builder
                            .withAppModel(appModel)
                            .withDOMContainer(container)
                            .build();

}

main();
