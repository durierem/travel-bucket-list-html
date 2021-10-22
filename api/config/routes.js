import express from 'express'
import { citiesController } from '../controllers/cities_controller.js'

export const router = express.Router()

router.get('/cities', citiesController.index)
router.post('/cities', citiesController.create)
router.get('/cities/:id', citiesController.show)
router.patch('/cities/:id', citiesController.update)
router.delete('/cities/:id', citiesController.destroy)
