//@ts-nocheck
class LoginModelMock {
  constructor(){ }
  init(){}
  set username(value) { }
  set password(value){ }
  get credential(){}
  get error() {}
  set error(value) {}
  destroy() {}
}

export const LoginModelMockFactory = {
  create: () => new LoginModelMock()
}