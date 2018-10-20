const express = require('express');
const parser = require('body-parser');
const path = require('path');
const db = require('../db/index.js');
const helpers = require('../helpers/helpers.js');
const dummyData = require('../dummyData.js'); 

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(parser.json());

let dummyDataPromise = new Promise((resolve, reject) => {
  return resolve(dummyData);
});

app.post('/movies', function(req, res) {
  // helpers.getMovieData(req.body.query)
  dummyDataPromise
    .then((results) => {
      let movie = results.data;
      if (movie.Response === 'True') {
        db.save(movie)
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
  db.get(req.params[0])
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
  db.clear()
    .then(() => {
      res.send();
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
});

app.get('/favicon', function(req,res) {
  res.send();
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});