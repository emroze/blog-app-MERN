# FullStack Blog App using MERN

### First clone the repo

##### Then create a .env file inside of api directory and paste the following code with updated MongoDB URL and JWT secret key.
```
MONGO_URL = "your-mongo-url"
JWT_SECRET = "jwt-secret-key"
CLIENT_URL = "http://localhost:5173"
```


### For starting backend server,

##### First change directory using the following command.

```
cd api
```

##### Now install necessary packages.

```
yarn install
```

##### Start the server.

```
npx nodemon index.api
```

#### For starting frontend server,

##### First change directory using the following command.

```
cd client
```

##### Now install necessary packages.

```
yarn install
```

##### Start the server.

```
yarn dev
```
