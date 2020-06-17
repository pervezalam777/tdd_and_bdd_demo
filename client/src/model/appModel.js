//@ts-nocheck
class AppModel {
  _userDetails = null 
  _currentScreen = null

  constructor(){}

  init(){
    // The following scenario is normally used in less secure application.
    //TODO: User has logged in and
    // Refresh the browser
    // if user token cookie available 
    // if user re-opens the application while user token cookie is still valid. 

    //In case more secure application session will time out as soon as
    // user leave application idle for 60 second (value may vary base on requirement)
    // user close the tab
    // user refresh the screen.
  }

  set userDetails(data){
    this._userDetails = data;
  }
  
  get userName(){
    return this._userDetails.username;
  }
  get userToken(){
    return this._userDetails.token;
  }
 
  get userEmail(){
    return this._userDetails.email;
  }

  get userRole(){
    return this._userDetails.role;
  }

  set currentScreen(screen){
    this._currentScreen = screen;
  }

  get currentScreen(){
    return this._currentScreen;
  }
}

export const AppModelFactory = {
  create: () => new AppModel()
}
