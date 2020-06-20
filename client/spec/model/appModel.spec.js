//@ts-nocheck

import { AppModelFactory }  from '../../src/model/appModel.js';

describe('Application model', () => {

  let appModel = null;
  
  beforeEach(() => {
    appModel = AppModelFactory.create();
  });

  afterEach(() => {
    appModel.destroy();
  });

  it('should initialize', () => {
    const initSpy = spyOn(appModel, 'init').and.callThrough();
    appModel.init();
    expect(initSpy).toHaveBeenCalled();
  });

  it('should set valid user details ', (done) => {
    const userObject = {
      username:'pervez', 
      token:'xyz', 
      email:'pervezalam777@gmail.com', 
      role:'admin'
    }
    const userDetailsSpy = spyOnProperty(appModel, 'userDetails', 'set').and.callThrough();
    appModel.userDetails = userObject;

    expect(userDetailsSpy).toHaveBeenCalled();
    // TODO: check if there is a better alternative of this.
    setTimeout(() => done(), 200);
  })

  it('should through error if user details object is not valid', () => {
    const invalidUserDetailsObjects = [
      {},
      [],
      10,
      "user=pervez",
      {username:'pervez'},
      {username:'pervez', token:'xyz'},
      {username:'pervez', token:'xyz', email:'pervezalam777@gmail.com'},
      //TODO: should also check if all properties are empty
      //{username:'', token:'', email:'', role:''}
    ]

    invalidUserDetailsObjects.forEach(userObject => {
      expect(() => {
        appModel.userDetails = userObject;
      }).toThrow(new Error('invalid user object'))
    })
  })
});
