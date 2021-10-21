require('dotenv').config()

const mongoose = require('mongoose')
const address = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(address, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB is OK'))
  .catch(() => console.log('DB failed'))
