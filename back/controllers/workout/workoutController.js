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

// @desc    Get workout
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkout = asyncHandler(async (req, res) => {
	//Получаем workout
	const workout = await Workout.findById(req.params.id)
		.populate('exercises') // Чтобы раскрылось содержимое упражнений
		.lean() // Для нормального отображения ...workout в res.json

	const minutes = Math.ceil(workout.exercises.length * 3.7)

	res.json({ ...workout, minutes })
})
