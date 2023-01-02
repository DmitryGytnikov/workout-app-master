import express from 'express'
import { addNewExerciseLog } from '../controllers/exercise/logController.js'
import { addNewExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addNewExercise)
//запрос  на адрес /, исп-ть логику addNewExercis, и пользователь д.б. авторизован
router.route('/log').post(protect, addNewExerciseLog)

export default router
