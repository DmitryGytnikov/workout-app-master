import express from 'express'
import { getUserProfile } from '../controllers/user/profileController.js'
import { authUser } from '../controllers/user/authController.js'
import { registerUser } from '../controllers/user/regController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile) //Если запрос  на адрес /profile, то исп-ть логику getUserProfile, и пользователь д.б. авторизован
router.route('/login').post(authUser)
router.route('/').post(registerUser)

export default router
