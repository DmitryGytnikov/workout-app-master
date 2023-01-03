import express from 'express'
import {
	createNewExerciseLog,
	getExerciseLog,
} from '../controllers/exercise/logController.js'
import { createNewExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise)
//запрос  на адрес /, исп-ть логику addNewExercis, и пользователь д.б. авторизован
router.route('/log').post(protect, createNewExerciseLog)
router.route('/log/:id').get(protect, getExerciseLog)

export default router
