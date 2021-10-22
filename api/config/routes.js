import express from 'express'
import { baseController } from '../controllers/base_controller.js'
import { citiesController } from '../controllers/cities_controller.js'

export const router = express.Router()

router.use(baseController.headers)
router.get('/cities', citiesController.index)
router.post('/cities', citiesController.create)
router.get('/cities/:id', citiesController.show)
router.patch('/cities/:id', citiesController.update)
router.delete('/cities/:id', citiesController.destroy)
