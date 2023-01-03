import express from 'express'
import { createNewWorkout } from '../controllers/workout/workoutController.js'
import { getWorkout } from '../controllers/workout/workoutController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout)
//запрос  на адрес /, исп-ть логику addNewWorkout, и пользователь д.б. авторизован
router.route('/:id').get(protect, getWorkout)

export default router
