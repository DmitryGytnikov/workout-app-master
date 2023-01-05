import express from 'express'
import { createNewWorkoutLog } from '../controllers/workout/logController.js'
import {
	createNewWorkout,
	updateWorkout,
} from '../controllers/workout/workoutController.js'
import { getWorkout } from '../controllers/workout/workoutController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout).put(protect, updateWorkout)
//запрос  на адрес /, исп-ть логику addNewWorkout, и пользователь д.б. авторизован
router.route('/log').post(protect, createNewWorkoutLog)

router.route('/:id').get(protect, getWorkout)

export default router
