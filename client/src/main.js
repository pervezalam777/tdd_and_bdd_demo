//@ts-nocheck
import "babel-polyfill";
import { ApplicationController } from './control/appController.js';

function bootstrap(){
  const app = new ApplicationController();
  app.init();
}

bootstrap();
