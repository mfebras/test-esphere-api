## Installation ##

* Open project in terminal
* Copy .env.example to .env
* Run `npm install`
* Run migration `npx knex migrate:latest`
* Run `npm run start` or `npm run dev` 
    (for `npm run dev` make sure nodemon already installed globally: `npm i nodemon -g`)

## Documentation ##

* When `APP_ENV=development` you can view the API documentation in `/docs` path, for example `http://localhost:3001/docs`
