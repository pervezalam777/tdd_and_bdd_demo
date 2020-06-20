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
  });

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
    ];

    invalidUserDetailsObjects.forEach(userObject => {
      expect(() => {
        appModel.userDetails = userObject;
      }).toThrow(new Error('invalid user object'));
    });
  })

  describe("logged in user", () => {
    const userObject = {
      username:'pervez', 
      token:'xyz', 
      email:'pervezalam777@gmail.com', 
      role:'admin'
    }

    beforeEach(() => {  
      appModel.userDetails = userObject;
    });

    it('should return user name', () => {
      expect(appModel.userName).toEqual(userObject.username);
    });

    it('should return user token', () => {
      expect(appModel.userToken).toEqual(userObject.token);
    });

    it('should return user email', () => {
      expect(appModel.userEmail).toEqual(userObject.email);
    });

    it('should return user role', () => {
      expect(appModel.userRole).toEqual(userObject.role);
    });
  })

  describe("User not logged in", () => {
    
    it('should return null as user name', () => {
      expect(appModel.userName).toEqual(null); 
    });

    it('should return null as token', () => {
      expect(appModel.userToken).toEqual(null);
    });

    it('should return null as email', () => {
      expect(appModel.userEmail).toEqual(null);
    });

    it('should return null as user role', () => {
      expect(appModel.userRole).toEqual(null);
    });
  });
  
  describe("User logged out", () => {
    const userObject = {
      username:'pervez', 
      token:'xyz', 
      email:'pervezalam777@gmail.com', 
      role:'admin'
    }

    beforeEach(() => {  
      appModel.userDetails = userObject;
    });

    it('should return null as user name', () => {
      expect(appModel.userName).toEqual(userObject.username);
      appModel.logout();
      expect(appModel.userName).toEqual(null); 
    });

    it('should return null as token', () => {
      expect(appModel.userToken).toEqual(userObject.token);
      appModel.logout();
      expect(appModel.userToken).toEqual(null);
    });

    it('should return null as email', () => {
      expect(appModel.userEmail).toEqual(userObject.email);
      appModel.logout();
      expect(appModel.userEmail).toEqual(null);
    });

    it('should return null as user role', () => {
      expect(appModel.userRole).toEqual(userObject.role);
      appModel.logout();
      expect(appModel.userRole).toEqual(null);
    });
  });

  describe('role as subscriber', () => {
    const observer = {
      callMe: () => {}
    }
    const handleLogin = () => {}

    it('should throw error if register event called with invalid argument', () => {
      const invalidList = [
        {forEvent:10, listener:10},
        {forEvent:true, listener:true},
        {forEvent:{}, listener:{}},
        {forEvent:[], listener:[]},
        {forEvent:"abc", listener:null},
        {forEvent:null, listener:() => {}},
      ]

      invalidList.forEach(({forEvent, listener}) => {
        expect(() => {
          console.log(forEvent, listener)
          appModel.registerListener(forEvent, listener)
        }).toThrow(new Error('Invalid argument for register listener'))
      });
    })

    it('should be able to register listener for specified event type', () => {
      
    });

    it('should not register same listener for same time', () => {

    });

    it('should be able to remove registered event listener', () => {

    });

    it('should not remove remove listener if event type miss match', () => {

    })

    it('should notify all listener(s) of defined event type on event dispatched ', () => {

    });

  })

});