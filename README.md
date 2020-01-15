# account

### API Reference

#### Create user
`POST: /register/ { username: "username", password: "password", email: "email@example.com" }`
###### returns
`201: { token: "token" }`

`406: { error: "unique indexes not used" }`

#### Authenticate user; retrieve token
`POST: /auth/ { username: "username", password: "password" }`
###### returns
`202: { token: "token" }`

`401: { error: "incorrect password" }`

`401: { error: "user not found" }`

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
      
`401: { error: "invalid token" }`


