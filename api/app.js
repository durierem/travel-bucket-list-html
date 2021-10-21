const express = require('express')
const db = require('./db')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Request from ${req.ip}: ${req.path}`)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

const citySchema = require('./models/city')

app.get('/cities', (req, res, next) => {
  citySchema.find()
    .then(cities => res.status(200).json(cities))
    .catch(error => res.status(400).json({ error }))
})


app.post('/cities', (req, res, next) => {
  const city = new citySchema({...req.body})
  city.save()
  .then(() => {
    res.status(201).json(city)
  })
  .catch((error) => {
    res.status(400).json({error})
  })
})

app.get('/cities/:id', (req, res, next) => {
  citySchema.findOne({ _id: req.params.id })
    .then((city) => res.status(200).json(city))
    .catch((error) => res.status(400).json({ error }))
})

app.patch('/cities/:id', (req, res, next) => {
  citySchema.findOneAndUpdate({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {
    returnDocument: 'after'
  })
    .then((city) => res.status(200).json(city))
    .catch((error) => res.status(400).json({ error }))
})

app.delete('/cities/:id', (req, res, next) => {
  citySchema.deleteOne({ _id: req.params.id })
    .then(() => res.status(204))
    .catch(error => res.status(400).json({ error }))
})

module.exports = app
