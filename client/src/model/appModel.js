//@ts-nocheck
class AppModel {
  _userDetails = null
  _currentScreen = null

  constructor(){}

  init(){}
  set userDetails(data){}
  
  get userName(){}
  get userToken(){}
  get userEmail(){}
  get userRole(){}

  set currentScreen(screen){}
  get currentScreen(){}
}

export const AppModelFactory = {
  create: () => new AppModel()
}