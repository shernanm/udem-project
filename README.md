# udem-project

udem-project

## First steps

#### Installing node

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting dependencies

Run `npm install` or `yarn` from rootpath of the project.

#### Starting your app

Now, we have two ways to start an app. To start your app in production mode run `npm start` in the root path of your project. To start your app in development mode (nodemon) run `npm run start-dev`. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.

## Development

#### Environment variables

`Dotenv` is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:

```
MONGO_DB_URI
PORT=8080
```

**Remember not to push nor commit the `.env` file.**

#### Logging

To log useful information of your program to the console you just need to import the logger located at `app/logger`. There are two possible types of logging: `info` and `error`. You should use them depending on the type of message you want to show.

Here is an example snippet:

```
const logger = require('/app/logger');
...
if (error) {
    logger.error('There is an error);
} else {
    logger.info('There is no error);
}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request
