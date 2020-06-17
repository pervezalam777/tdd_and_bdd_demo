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
}

export const AppModelMockFactory = {
  create: () => {
    return new AppModelMock();
  }
}