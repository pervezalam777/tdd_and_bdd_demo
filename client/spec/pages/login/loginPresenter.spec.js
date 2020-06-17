//@ts-nocheck
import { LoginModelMockFactory } from './mock/loginModel.moc.js';
import { LoginViewMockFactory } from './mock/loginView.moc.js';
import { AppModelMockFactory } from '../../mock/appModel.moc.js';
import { LoginServiceMockFactory } from '../../mock/loginService.moc.js'

import { LoginPresenterFactory } from '../../../src/pages/login/loginPresenter.js'

describe('Login Presenter', () => {

  let loginPresenterInstance = null;
  const container = document.createElement('div');
  beforeEach(() =>{
    document.body.appendChild(container);
    loginPresenterInstance = LoginPresenterFactory.create();
  });

  afterEach(() => {
    loginPresenterInstance.destroy();
    loginPresenterInstance = null;
    document.body.removeChild(container);
  });

  describe('initialization', () => {
    it('should throw error if invalid initialization object passed', () => {
      const invalidInitializationObjects = [
        {},
        [],
        10,
        null,
        undefined,
        '',
        {appModel:{}, loginModel:{}, loginView:{}},
        {model:{}, view:{}}
      ]

      invalidInitializationObjects.forEach(initObject => {
        expect(() => {
          loginPresenterInstance.init(initObject);
        }).toThrow(new Error('Invalid presenter initialization'))
      });
    });

    it('should be require login view, login model, login service, and application model', () => {

      const appModel = AppModelMockFactory.create();
      const loginModel = LoginModelMockFactory.create();
      const loginView = LoginViewMockFactory.create();
      const loginService = LoginServiceMockFactory.create();

      spyOn(loginModel, 'init').and.callThrough();

      spyOn(loginView, 'init').and.callThrough();
      spyOn(loginView, 'render').and.callThrough();
      spyOn(loginView, 'assignEvents').and.callThrough();

      loginPresenterInstance.init({appModel, loginModel, loginView, container, loginService});

      expect(loginModel.init).toHaveBeenCalled();

      expect(loginView.init).toHaveBeenCalled();
      expect(loginView.render).toHaveBeenCalled();
      expect(loginView.assignEvents).toHaveBeenCalled();
    })
  })

  describe('user input', () => {
    let loginModel;
    beforeEach(() => {
      loginModel = LoginModelMockFactory.create();
      const loginView = LoginViewMockFactory.create();
      const appModel = AppModelMockFactory.create();
      const loginService = LoginServiceMockFactory.create();
      loginPresenterInstance.init({appModel, loginModel, loginView, container, loginService});
    });

    it('should be stored in the login model', () => {
      const usernameSpy = spyOnProperty(loginModel, 'username', 'set').and.callThrough();
      const passwordSpy = spyOnProperty(loginModel, 'password', 'set').and.callThrough();

      loginPresenterInstance.handleChange({target:{id:'username', value:'pervez'}});
      expect(usernameSpy).toHaveBeenCalled();

      loginPresenterInstance.handleChange({target:{id:'password', value:'password1'}});
      expect(passwordSpy).toHaveBeenCalled();
    })
  })

  describe('login', () => {
    let loginModel;
    let loginService;
    let appModel;
    let loginView;
    beforeEach(() => {
      loginModel = LoginModelMockFactory.create();
      loginService = LoginServiceMockFactory.create();
      appModel = AppModelMockFactory.create();
      loginView = LoginViewMockFactory.create();

      loginPresenterInstance.init({appModel, loginModel, loginView, container, loginService});
    });
    
    it('should log in a valid user', async () => {
      const credential = '{"username":"pervez","password":"pass123456"}';
      const result = {
        username:'pervez',
        token: '123456789',
        email: 'pervezalam777@gmail.com',
        role: "admin"
       }
      
      const spy = spyOnProperty(loginModel, 'credential', 'get')
        .and.returnValue(credential);
      const spyService = spyOn(loginService, 'doLogin').and.returnValue(Promise.resolve(result));
      const spyAppModel = spyOnProperty(appModel, 'userDetails', 'set').and.callThrough();

      await loginPresenterInstance.handleSubmit({preventDefault:()=>{}});
      
      expect(spy).toHaveBeenCalled();
      expect(spyService).toHaveBeenCalled();
      expect(spyService).toHaveBeenCalledWith(credential);
      expect(spyAppModel).toHaveBeenCalled();
    })

    it('should show login error if login unsuccessful', async () => {
      const credential = '{"username":"baduser","password":"badpass"}';
      const rejectError = {
        message:'Invalid credential'
      }
      
      const spy = spyOnProperty(loginModel, 'credential', 'get')
        .and.returnValue(credential);
      const spyService = spyOn(loginService, 'doLogin').and.returnValue(Promise.reject(rejectError));
      const spyLoginView = spyOn(loginView, 'displayError');

      await loginPresenterInstance.handleSubmit({preventDefault:()=>{}});
      
      expect(spy).toHaveBeenCalled();
      expect(spyService).toHaveBeenCalled();
      expect(spyService).toHaveBeenCalledWith(credential);
      expect(spyLoginView).toHaveBeenCalled();
      expect(spyLoginView).toHaveBeenCalledWith(true, rejectError.message);
    })
  })

});