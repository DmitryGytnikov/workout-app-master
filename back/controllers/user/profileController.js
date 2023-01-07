import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import User from '../../models/userModel.js'
import WorkoutLog from '../../models/workoutLogModel.js'

// @desc    Get user profile Описание
// @route   GET /api/users/profile Путь
// @access  Private Доступ - авторизованный пользователь
export const getUserProfile = asyncHandler(async (req, res) => {
	//Обновляем user на всякий случай
	const user = await User.findById(req.user._id).select('-password').lean()
	//в req.user записывается пользователь, токен которого пришел в хедере запроса

	const exerciseLogByUser = await ExerciseLog.find({
		user: user._id,
		completed: true,
	}) //находим все поля со страницы exercise

	let countExerciseTimesCompleted = 0
	let kgs = 0

	exerciseLogByUser.forEach(log => {
		countExerciseTimesCompleted += log.times.length

		log.times.forEach(item => {
			kgs += item.weight
		})
	}) //forEach ничего не возвращает

	const minutes = Math.ceil(countExerciseTimesCompleted * 2.3)

	const workouts = await WorkoutLog.find({
		user: user._id,
		completed: true,
	}).countDocuments() // высчитывает по ходу

	res.json({
		...user, //разворачиваем с помощью спрэд-оператора
		minutes,
		workouts,
		kgs,
	})
})
