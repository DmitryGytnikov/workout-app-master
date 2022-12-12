import express from 'express'
import { getUserProfile } from '../controllers/userController.js'
/* import { authUser } from '../controllers/user/authController.js' */
/* import { getUserProfile } from '../controllers/user/profileController.js' */
/* import { registerUser } from '../controllers/user/regController.js'
import { protect } from '../middleware/authMiddleware.js' */

const router = express.Router()

router.route('/profile').get(getUserProfile)

export default router
