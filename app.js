require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./app/routes');
const logger = require('./app/logger');

const port = 8080;

const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10;
const DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: DEFAULT_PARAMETER_LIMIT,
  limit: DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: DEFAULT_PARAMETER_LIMIT,
  limit: DEFAULT_BODY_SIZE_LIMIT
});

const app = express();

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json(bodyParserJsonConfig()));
app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true
  })
  .then(() => logger.info('Connected to MongoDB Atlas'))
  .catch(error => logger.info(error));
routes.init(app);

Promise.resolve()
  .then(() => {
    app.listen(port);

    logger.info(`Listening on port: ${port}`);
  })
  .catch(logger.error);
