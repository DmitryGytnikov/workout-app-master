import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

// @desc    Add new workout Описание
// @route   Post /api/workouts Путь
// @access  Private Доступ - авторизованный пользователь
export const addNewWorkout = asyncHandler(async (req, res) => {
	//Получаем данные:
	const { name, exerciseIds } = req.body

	// Все запросы к БД - асинхронные функции
	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
	})

	res.json(workout)
})
