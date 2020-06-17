//@ts-nocheck
class LoginService {
  constructor(){}

  async doLogin(credential) {
    let response = await fetch('', {
      method:'POST',
      body: credential
    });
    response = await response.json();
    return response;
  }
}

export const LoginServiceFactory = {
  create:() => new LoginService()
}