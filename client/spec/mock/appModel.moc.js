//@ts-nocheck
class AppModelMock {
  init(){}
  set userDetails(data){}
  get userName(){}
  get userToken(){}
  get userEmail(){}
  get userRole(){}

  set currentScreen(screen){}
  get currentScreen(){}

  registerListener(forEvent, listenerFunction){}
  removeListener(forEvent, listenerFunction){}
  dispatchEvent(event){}
  logout(){}
  destroy(){}
}

export const AppModelMockFactory = {
  create: () => {
    return new AppModelMock();
  }
}