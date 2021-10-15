const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  year:  { type: Number, required: true },
  duration: { type: Number, required: true },
  unit: { type: String, required: true },
  visited: { type: Boolean, required: true }
});

module.exports = mongoose.model('City', citySchema);
