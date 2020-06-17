//@ts-nocheck

import { ApplicationController } from './appController.js';

function bootstrap(){
  const app = new ApplicationController();
  app.init();
}

bootstrap();
