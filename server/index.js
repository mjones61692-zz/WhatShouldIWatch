const express = require('express');
const session = require('express-session');
const parser = require('body-parser');
const path = require('path');
const db = require('../db/index.js');
const helpers = require('../helpers/helpers.js');
const dummyData = require('../dummyData.js');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

const app = express();

const hash = Promise.promisify(bcrypt.hash);
const compareHash = Promise.promisify(bcrypt.compare);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(parser.json());

app.use(session({
  secret: 'hrmvp',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: db.connection})
}));

let dummyDataPromise = new Promise((resolve, reject) => {
  return resolve(dummyData);
});

app.post('/movies', function(req, res) {
  helpers.getMovieData(req.body.query)
  // dummyDataPromise
    .then((results) => {
      let movie = results.data;
      console.log(movie);
      if (movie.Response === 'True') {
        db.save(movie, req.session.user || req.sessionID)
          .then(() => {
            res.status(201).send();
          })
          .catch((err) => {
            if (err) {
              console.error(err);
            }
          });
      } else {
        res.status(201).send({badSearch: true});
      }
    });
});

app.get('/movies*', function(req, res) {
  db.get(req.params[0], req.session.user || req.sessionID)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
});

app.get('/clear', function(req, res) {
  db.clear(req.session.user || req.sessionID)
    .then(() => {
      res.send();
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
});

app.post('/signup', function(req, res) {
  db.findUser(req.body.user)
    .then((returnedUser) => {
      if (returnedUser[0]) {
        res.status(201).send({takenUser: true})
      } else {
        hash(req.body.pass, null, null)
          .then((hash) => {
            db.saveUser(req.body.user, hash)
            .then(() => {
              req.session.user = req.body.user;
              res.status(201).send();
            })
          });
      }
    })
});

app.post('/login', function(req, res) {
  db.findUser(req.body.user)
    .then((returnedUser) => {
      if (returnedUser[0]) {
        compareHash(req.body.pass, returnedUser[0].password)
          .then((bool) => {
            if (bool) {
              req.session.user = req.body.user;
              res.status(201).send();
            } else {
              res.status(201).send({wrongPassword: true});
            }
          })
      } else {
        res.status(201).send({noUser: true});
      }
    })
});

app.get('/logout', function(req, res) {
  req.session.regenerate((err) => {
    if (err) {
      console.error(err);
    }
    res.send();
  })
});

app.get('/favicon', function(req,res) {
  res.send();
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});