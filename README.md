## Description

Flight Scrapper App built using [Nest](https://github.com/nestjs/nest) framework abd TypeScript

## Project setup
1. Clone the repo from [Github](https://github.com/Bobooshodi/pulsifi-flight-scrapper-app)

```bash
$ git clone https://github.com/Bobooshodi/pulsifi-flight-scrapper-app.git
```
2. Navigate to the project directory

```bash
$ cd pulsifi-flight-scrapper-app
```
3. Copy the `.env.sample` file and rename it to `.env` and adjust the contents accordingly

```bash
$ cp .env.sample .env
```

## With Docker 
4. Start the container and you're done.
```bash
$ docker-compose up -d
```

## Without Docker 
4. install dependencies

```bash
$ yarn
```
5. Compile and run the project
```bash
$ yarn run start
```


## Accessing the App
You can access the Swagger Docs at
```
http://localhost:3000/api
```

You can access the main APIs from
```
http:// localhost:3000
```

Test User Accounts
```
{
  userId: 1,
  username: 'test',
  password: '1234',
},
{
  userId: 2,
  username: 'user',
  password: 'pass',
},
```