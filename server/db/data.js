//@ts-nocheck
const database = [
  {
    username: 'pervez',
    password: 'password123',
    email: 'pervezalam777@gmail.com',
    role: "admin"
  },
  {
    username: 'vijay',
    password: 'password123',
    email: 'pervezalam777@gmail.com',
    role: "admin"
  }
]

export const findUser = (credential) => {
  let {username, password} = credential;
  username = username.toLowerCase();
  for(let user of database){
    if(username === user.username && password === user.password){
      let userFound = JSON.parse(JSON.stringify(user))
      delete userFound.password;
      return userFound;
    }
  }
  return null;
}