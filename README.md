# account

### API Reference

#### Create user
`POST: /register/ { username: "username", password: "password", email: "email@example.com" }`
###### returns
`201: { token: "token" }`

`{
     "status": 406,
     "type": "credentialInterference",
     "message": "The provided parameters are not acceptable (In use or otherwise not available)."
 }`

#### Authenticate user; retrieve token
`POST: /auth/ { username: "username", password: "password" }`
###### returns
`202: { token: "token" }`

`{
     "status": 401,
     "type": "credentialInvalid",
     "message": "The provided parameters do not match records."
 }`

#### Get user data
`GET: /register/ { token: "token" }`
###### returns
`200: 
    {
          "_id": "userId",
          "username": "username",
          "email": "email",
          "password": "password hash",
          "date": "account creation",
      }`
      
`{
     "status": 401,
     "type": "authTokenInvalid",
     "message": "The token you provided has expired or does not exist."
 }`


