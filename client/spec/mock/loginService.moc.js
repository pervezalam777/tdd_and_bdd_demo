//@ts-nocheck
class LoginServiceMock {
  doLogin(credential) { }
}

export const LoginServiceMockFactory = {
  create: () => new LoginServiceMock()
}