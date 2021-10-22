import mongoose from 'mongoose'
import { config } from './config.js'

mongoose.connect(`mongodb+srv://${config.db.url}/${config.db.name}`, {
  user: config.db.user,
  pass: config.db.password,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database OK'))
  .catch(() => console.log('Database FAILED'))
