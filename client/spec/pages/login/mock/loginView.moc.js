//@ts-nocheck
class LoginViewMock {
  constructor() {}
  init(container, opt) { return this; }
  render() { return this; }
  assignEvents() { return this; }
  resetForm() { return this; }
  displayError(show = false, message = '') { return this; }
  destroy() { }
}

export const LoginViewMockFactory = {
  create: () => new LoginViewMock()
}