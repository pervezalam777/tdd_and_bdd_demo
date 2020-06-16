//@ts-nocheck
import { LoginModelFactory } from '../../../src/pages/login/loginModel.js'

describe('Login model', ()=>{

  let loginModelInstance = null;
  beforeEach(() =>{
    loginModelInstance = LoginModelFactory.create();
  })

  afterEach(() => {
    loginModelInstance.destroy();
    loginModelInstance = null;
  })

  it('should store username and password as valid strings', () => {
    loginModelInstance.username = 'pervez';
    loginModelInstance.password = 'pervez1';

    expect(loginModelInstance._username).toEqual('pervez');
    expect(loginModelInstance._password).toEqual('pervez1');
  })

  it('should set non-string value', () => {
    let falseValues = [
      {username:null, password:null},
      {username:undefined, password:undefined},
      {username:10, password:10},
      {username:true, password:true},
      {username:[], password:[]},
      {username:{}, password:{}}
    ]
    falseValues.forEach(({username, password}) => {
      loginModelInstance.username = username;
      loginModelInstance.password = password;
  
      expect(loginModelInstance._username).toEqual('');
      expect(loginModelInstance._password).toEqual('');
    })
  })


  it(`should return null server object 
      if username and password did not set before or blank`, () => {
      let credential = loginModelInstance.credential;
      expect(credential).toBe(null);
  })
  
  it(`should return serialized user credential so that it can be send to server`, () => {
    loginModelInstance.username = 'pervez';
    loginModelInstance.password = 'pervez1';

    let credential = loginModelInstance.credential;
    expect(credential).toEqual('{"username":"pervez","password":"pervez1"}');
  })

  it('should be able to set and get error message', () => {
    let error = "Error: ocurred";
    loginModelInstance.error = error;
    expect(loginModelInstance.error).toEqual(error);
  })

  it('should not be able to set non-string error message', () => {
    let falseValues = [10, true, [], {}, undefined, null];
    falseValues.forEach(value => {
      loginModelInstance.error = value;
      expect(loginModelInstance.error).toEqual('');
    })
  })
})