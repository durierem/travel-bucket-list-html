const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

const citySchema = require('./models/city');

app.get('/cities', (req, res, next) => {
  citySchema.find()
    .then(cities => res.status(200).json(cities))
    .catch(error => res.status(400).json({ error }));
});

app.post('/cities', (req, res, next) => {
  const city = new citySchema({...req.body});
  city.save()
    .then(() => {
      res.status(201).json({
        message: 'city saved'
      })
    })
    .catch((error) => {
      res.status(400).json({error})
    });
});

app.delete('/cities/:id', (req, res, next) => {
  citySchema.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'city deleted'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;
