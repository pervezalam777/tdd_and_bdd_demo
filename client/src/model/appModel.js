//@ts-nocheck

//NOTE: Application Model also behave like application level event dispatcher
// Of course there are other ways to create application level dispatcher.
// that makes event driven application. As it is demo purpose so keeping application
// level dispatcher role here in this module only. It will be supplied to all the screens as and when required.

/**
 * interface AppEvent {
 *  type:string
 *  payload?:any
 * }
 * 
 * interface Dispatcher {
 *  registerListener(forEvent:string, listenerFunction:Function);
 *  removeListener(forEvent:string, listenerFunction:Function);
 *  dispatchEvent(event:AppEvent)
 * }
 */
import { hasPropertyWithType, checkType } from '../utils/utils.js';

const userDetailsRequiredProperties = [
  'username', 'token', 'email', 'role'
]

class AppModel {
  _userDetails = null 
  _listeners = {}

  constructor(){}

  init(){
    // The following scenario is normally used in less secure application.
    // TODO: User has logged in and
    // Refresh the browser
    // if user token cookie available 
    // if user re-opens the application while user token cookie is still valid. 

    //In case more secure application session will time out as soon as
    // user leave application idle for 60 second (value may vary base on requirement)
    // user close the tab
    // user refresh the screen.
  }

  registerListener(forEvent, listenerFunction){
    if(!checkType(forEvent, 'string') 
      || !checkType(listenerFunction, 'function')){
        throw new Error('Invalid argument for register listener');
      }
    if(!this._listeners[forEvent]){
      this._listeners[forEvent] = [listenerFunction];
      return true;
    }
    const listenerList = this._listeners[forEvent];
    if(!listenerList.includes(listenerFunction)){
      listenerList.push(listenerFunction);
      return true;
    }
    return false; 
  }

  removeListener(forEvent, listenerFunction){
    const listeners = this._listeners[forEvent];
    if(listeners && listeners.length > 0 && listeners.includes(listenerFunction)){
      this._listeners[forEvent] = listeners.filter(fn => fn !== listenerFunction);
      return true;
    }
    return false;
  }

  dispatchEvent(event){
    const listeners = this._listeners[event.type];
    if(listeners && listeners.length > 0){
      listeners.forEach(fn => {
        fn.apply(null, event);
      })
    }
  }

  set userDetails(data){
    if(!hasPropertyWithType(data, userDetailsRequiredProperties, 'string')){
      throw new Error('invalid user object');
    }
    this._userDetails = data;
  }
  
  get userName() { 
    return this._userDetails ? this._userDetails.username : null;
  }
  get userToken() {
    return this._userDetails ? this._userDetails.token : null;
  }
 
  get userEmail(){
    return this._userDetails ? this._userDetails.email : null;
  }

  get userRole(){
    return this._userDetails ? this._userDetails.role : null;
  }

  logout(){
    this._userDetails = null;
  }

  destroy(){
    this._userDetails = null;
    this._listeners = null;
  }
}

export const AppModelFactory = {
  create: () => new AppModel()
}
