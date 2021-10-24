import mongoose from 'mongoose'

export const City = mongoose.model('City', mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  year: { type: Number, required: false },
  duration: { type: Number, required: false },
  unit: { type: String, required: false },
  visited: { type: Boolean, required: true }
}))
