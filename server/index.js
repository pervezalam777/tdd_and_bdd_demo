//@ts-nocheck
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { findUser } from './db/data.js';
import { getToken } from './tokenBuilder.js';

const app = express()
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

//TODO: All the rest end point which does not require user token
// should be in separate route

//TODO: All the Authentication route should be moved to separate route.

app.post('/login', (req, res) => {
  //console.log(req);
  let {username, password} = req.body;
  if(!username && !password){
    res.status(400).send({message:'bad request'});
    return;
  }

  //TODO: For now it is a hardcoded implementation

  let user = findUser({username, password});
  if(user === null){
    res.status(403).send({message:'Invalid credential'});
    return;
  }

  user.token = getToken(user);
  res.status(200).send(user);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))