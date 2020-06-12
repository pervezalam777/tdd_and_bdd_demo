# API Server

## API V1

### /api/v1/login
Login end point  

#### Request
**Method**: POST
<br/>
**ContentType**:"application/json"
<br/>
**Request body**
```json
{
    "username":"pervezalam777",
    "password":"123456789" 
}
```
#### Response
For a successful authentication
<br/>
**status** : 200
<br/>
**ContentType**:"application/json"
<br/>
**Response body**
```json
{
    "userid": "abc1212",
    "email": "pervezalam777@gmail.com",
    "fname": "pervez",
    "lname": "alam",
    "role": "admin"
}
```

For a bad request either username or password field missing
<br/>
**status** : 400
<br/>
**ContentType**:"application/json"
<br/>
**Response body**
```json
{
    "lang":"en",
    "msg":"required field are missing"
}
```

For invalid credential
<br/>
**status** : 403
<br/>
**ContentType**:"application/json"
<br/>
**Response body**
```json
{
    "lang":"en",
    "msg":"you are not authorized, please check your credential"
}
```

### /api/v1/logout


### /api/v1/dashboard

## Notes
* Within a "type": "module" package scope, Node.js can be instructed to interpret a particular file as CommonJS by naming it with a **.cjs** extension (since both .js and .mjs files are treated as ES modules within a "module" package scope).