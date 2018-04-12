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
db.once('open', () => {
  console.log('Connected to DB');
});
const { Schema } = mongoose;
const MongoStore = require('connect-mongo')(session);
const eventSchema = new Schema({
  _id: Schema.Types.ObjectId, title: String, start: Number, end: Number,
});
const userSchema = new Schema({ name: String, password: String, events: [eventSchema] });
const User = mongoose.model('User', userSchema);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

function getInitialState() {
  return {
    isModalVisible: false,
    isJSONModalVisible: false,
    events: [],
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

const createPageStructure = (req, res, preloadedState) => {
  const store = createStore(rootReducer, preloadedState);

  const html = renderToString(<Provider store={store}>
    <StaticRouter context={{}} location={req.url}>
      <RenderRoutes />
    </StaticRouter>
  </Provider>);

  const finalState = store.getState();

  res.send(renderFullPage(html, finalState));
};

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  User.findOne({ name, password }, (err, user) => {
    if (err) console.log(err);
    else {
      res.send({ username: user.name });
    }
  });
});

app.post('/add', (req, res) => {
  const { username } = req.body;
  if (username) {
    const { event } = req.body;
    event._id = mongoose.Types.ObjectId();
    User.findOneAndUpdate({ name: username }, { $push: { events: event } }, { new: true }, (err, user) => {
      if (err) console.log(err);
      if (user) {
        res.json({ user });
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

app.post('/remove', (req, res) => {
  const { username, id } = req.body;
  if (username) {
    User.findOneAndUpdate(
      { name: username },
      { $pull: { events: { _id: id } } },
      { new: true },
      (err, user) => {
        if (err) console.log(err);
        if (user) {
          res.send(user);
        } else {
          res.redirect('/');
        }
      },
    );
  } else {
    res.redirect('/');
  }
});

app.get('/', (req, res) => {
  const preloadedState = getInitialState();

  createPageStructure(req, res, preloadedState);
});

app.get('/calendar', (req, res) => {
  const { username } = req.query;
  if (username) {
    User.findOne({ name: username }, (err, user) => {
      if (err) console.log(err);
      if (user) {
        res.json({ user });
      } else {
        console.log(err);
      }
    });
  } else {
    const preloadedState = getInitialState();

    createPageStructure(req, res, preloadedState);
  }
});

app.listen(port, (err) => {
  console.log(`Server is hosted on localhost:${port}`);
});
