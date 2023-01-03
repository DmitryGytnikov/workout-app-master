import express from 'express'
import { createNewExerciseLog } from '../controllers/exercise/log/createController.js'
import { getExerciseLog } from '../controllers/exercise/log/getController.js'
import { updateExerciseLog } from '../controllers/exercise/log/updateController.js'
import { createNewExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise)
//запрос  на адрес /, исп-ть логику addNewExercis, и пользователь д.б. авторизован
router
	.route('/log')
	.post(protect, createNewExerciseLog)
	.put(protect, updateExerciseLog)
router.route('/log/:id').get(protect, getExerciseLog)

export default router
