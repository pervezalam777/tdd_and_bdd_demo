//@ts-nocheck
import { LoginViewFactory } from '../../../src/pages/login/loginView.js'

describe('Login view', () => {

  let loginViewInstance = null;
  let container = null;
  beforeEach(() =>{
    container = document.createElement('div');
    document.body.appendChild(container);
    loginViewInstance = LoginViewFactory.create();
  });

  afterEach(() => {
    loginViewInstance.destroy();
    loginViewInstance = null;
    document.body.removeChild(container)
    container = null;
  });

  describe('initialization', () => {
    it('should except a valid object', () => {
      const validObject = { 
        handleChange: () => {},
        handleSubmit: () => {}
      }

      let obj = loginViewInstance.init(container, validObject);
      expect(obj).toBe(loginViewInstance);

    });

    it('should throw error if invalid options passed', () => {
      let common = [
        {},
        [],
        null,
        undefined,
        10,
        "some string",
        true
      ]
      let invalidObjects = [
        ...common,
        {onChange:() => {}, onSubmit:() => {}},
      ]
      invalidObjects.forEach(item => {
        expect(() => { 
          loginViewInstance.init(container, item) 
        }).toThrow(new Error('Invalid arguments passed'));
      })

      let invalidContainers = [
        ...common,
        document,
        document.createElement('span'),
      ]
      invalidContainers.forEach(item => {
        expect(() => { 
          loginViewInstance.init({}, {handleChange: () => {}, onSubmit: () => {}}) 
        }).toThrow(new Error('Invalid arguments passed'));
      })
    });
  });

  describe('render', () => {
    beforeEach(()=>{
      const validObject = { 
        handleChange: () => {},
        handleSubmit: () => {}
      }
      loginViewInstance.init(container, validObject);
    });

    it('should add login form in given container', () => {
      let obj = loginViewInstance.render();
      expect(obj).toBe(loginViewInstance);

      let formElements = ['loginForm', 'username', 'password', 'login'];
      for(let element of formElements){
        let formElement = document.getElementById(element);
        expect(formElement).toBeTruthy();
      }
    });
  });

  describe('events', () => {
    let inputValue = '';
    let submitCalled = false;
    const validObject = { 
      handleChange: (e) => { inputValue = e.target.value },
      handleSubmit: (e) => {e.preventDefault(); submitCalled = true;}
    }

    beforeEach(()=>{ 
      loginViewInstance
        .init(container, validObject)
        .render();
    });

    it('should be assigned on input fields to capture changes', () => {
      //TODO: need some more R&D on this as
      // many post has reported same kind of issue
      // https://github.com/facebook/jest/issues/5268
      // https://stackoverflow.com/questions/9396538/issues-with-jasmines-spyon-tohavebeencalled-method
      
      // spyOn(validObject, 'handleChange');

      loginViewInstance.assignEvents();
      
      let fieldsAndValues = [
        {field:'username', value:'pervez'},
        {field:'password', value:'password123'}
      ]

      fieldsAndValues.forEach(item => {
        let element = document.getElementById(item.field);
        element.value = item.value;
        element.dispatchEvent(new CustomEvent('change'));
        expect(inputValue).toEqual(item.value)
        //expect(validObject.handleChange).toHaveBeenCalled();
      });
    });

    it('should be assigned on login button to submit the form', () => {
      loginViewInstance.assignEvents();
      let element = document.getElementById('login');
      element.dispatchEvent(new CustomEvent('click'));
      expect(submitCalled).toBeTrue();
    });
  });

  describe('error', () => {

  });

  describe('reset', () => {

  });

});