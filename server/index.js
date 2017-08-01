import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import normalizePort from 'normalize-port';
import compression from 'compression';
import mongoose from 'mongoose';

import config from './configuration/config';

const port = normalizePort(process.env.PORT || config.expressPort);

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ threshold: 0 }));

//database config
mongoose.connect(config.database.mongodb.defaultUri, config.database.mongodb.options);

//config routes
import routes from './routes';
routes(app);
//end config routes

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});