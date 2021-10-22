import express from 'express'
import morgan from 'morgan'
import './config/db.js'
import { router } from './config/routes.js'

export const app = express()

app.use(express.json()) // JSON (actually idk what this does exactly)
app.use(morgan('dev')) // Log incoming requests
app.use('/', router) // App router
