//@ts-nocheck
const API_SERVER = 'http://localhost:4000'
class LoginService {
  
  constructor(){}

  async doLogin(credential) {
    console.log("---",credential)
    try{
      let response = await fetch(`${API_SERVER}/login`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: credential
      });
      if(!response.ok){
        response = await response.json();
        return Promise.reject(response);
      }
      response = await response.json();
      return response;
    } catch(e){
      console.log('service --', e);
      return Promise.reject({message:e.message});
    }
  }
}

export const LoginServiceFactory = {
  create:() => new LoginService()
}