import express from 'express'
import morgan from 'morgan'
import './config/db.js'
import { router } from './config/routes.js'

export const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/', router)
