import asyncHandler from 'express-async-handler'
// import ExerciseLog from '../../models/exerciseLogModel.js'
import User from '../../models/userModel.js'
// import WorkoutLog from '../../models/workoutLogModel.js'

// @desc    Get user profile Описание
// @route   GET /api/users/profile Путь
// @access  Private Доступ - авторизованный пользователь
export const getUserProfile = asyncHandler(async (req, res) => {
	//Обновляем user на всякий случай
	const user = await User.findById(req.user._id).select('-password')
	res.json(user)
})
