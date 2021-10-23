import mongoose from 'mongoose'
import { config } from './config.js'

mongoose.connect(config.db.address, {
  user: config.db.user,
  pass: config.db.password,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('database: [OK]'))
  .catch((error) => console.log(`database: [ERROR] ${error}`))
