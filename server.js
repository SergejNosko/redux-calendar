import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { RenderRoutes } from './src/components/Root';
import rootReducer from './src/reducers/rootReducer';

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('./dist'));
app.use(bodyParser.json());

mongoose.connect('mongodb://sergejnosko:1024@ds145283.mlab.com:45283/calendar');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});
const Schema = mongoose.Schema;
const MongoStore = require('connect-mongo')(session);
const userSchema = new Schema({name: String, password: String});
const User = mongoose.model('User', userSchema);

app.use(session({
  secret: 'secret',
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

function getInitialState() {
  return {

  };
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
       <title>Log In</title>
      </head>
      <body>
        <div id="app">${html}</div>
           <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
       
        <script src="app.js"></script>
      </body>
    </html>
    `;
}

app.post('/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ name, password }, (err, user) => {
    if (err) console.log(err);
    else {
      req.session.username = user.name;
      res.send({username: user.name});
    }
  });
});

app.get('/', (req, res) => {
  const preloadedState = getInitialState();

  const store = createStore(rootReducer, preloadedState);

  const html = renderToString(<Provider store={store}>
    <StaticRouter context={{}} location={req.url}>
      <RenderRoutes />
    </StaticRouter>
  </Provider>);

  const finalState = store.getState();

  res.send(renderFullPage(html, finalState));
});

app.listen(port, (err) => {
  console.log(`Server is hosted on localhost:${port}`);
});
