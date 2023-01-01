import express from 'express'
import { addNewExercise } from '../controllers/exercise/exerciseController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addNewExercise)
//запрос  на адрес /, исп-ть логику addNewExercis, и пользователь д.б. авторизован

export default router
