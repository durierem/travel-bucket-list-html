import { BaseController } from './base_controller.js'
import { City } from '../models/city.js'

class CitiesController extends BaseController {
  constructor () {
    super()
  }

  index (request, response, next) {
    citySchema.find()
      .then(cities => response.status(200).json(cities))
      .catch(error => response.status(400).json({ error }))
  }

  create (request, response, next) {
    const city = new City({ ...request.body })
    city.save()
      .then(() => response.status(201).json(city))
      .catch((error) => response.status(400).json({ error }))
  }

  show (request, response, next) {
    citySchema.findOne({ _id: request.params.id })
      .then((city) => response.status(200).json(city))
      .catch((error) => response.status(400).json({ error }))
  }

  update (request, response, next) {
    const findfilter = { _id: request.params.id }
    const updateQuery = { ...request.body, _id: request.params.id }
    citySchema.findOneAndUpdate(findfilter, updateQuery, {
      returnDocument: 'after'
    }).then((city) => response.status(200).json(city))
      .catch((error) => response.status(400).json({ error }))
  }

  destroy (request, response, next) {
    citySchema.deleteOne({ _id: request.params.id })
      .then(() => response.status(204))
      .catch(error => response.status(400).json({ error }))
  }

}

export const citiesController = new CitiesController()
