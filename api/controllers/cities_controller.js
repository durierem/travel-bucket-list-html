import { City } from '../models/city.js'

class CitiesController {
  index (_request, response, _next) {
    City.find()
      .then(cities => response.status(200).json(cities))
      .catch(error => response.status(400).json({ error }))
  }

  create (request, response, _next) {
    const city = new City({ ...request.body })
    city.save()
      .then(() => response.status(201).json(city))
      .catch((error) => response.status(400).json({ error }))
  }

  show (request, response, _next) {
    City.findOne({ _id: request.params.id })
      .then((city) => response.status(200).json(city))
      .catch((error) => response.status(400).json({ error }))
  }

  update (request, response, _next) {
    const findfilter = { _id: request.params.id }
    const updateQuery = { ...request.body, _id: request.params.id }
    City.findOneAndUpdate(findfilter, updateQuery, {
      returnDocument: 'after'
    }).then((city) => response.status(200).json(city))
      .catch((error) => response.status(400).json({ error }))
  }

  destroy (request, response, _next) {
    City.deleteOne({ _id: request.params.id })
      .then((deletedCount) => response.status(200).json(deletedCount))
      .catch(error => response.status(400).json({ error }))
  }
}

export const citiesController = new CitiesController()
