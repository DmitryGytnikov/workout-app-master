import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

// @desc    Create new workout Описание
// @route   Post /api/workouts Путь
// @access  Private Доступ - авторизованный пользователь
export const createNewWorkout = asyncHandler(async (req, res) => {
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

// @desc    Get workouts
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await Workout.find({}).populate('exercises')

	res.json(workouts)
})

// @desc    Update workout
// @route   PUT /api/workouts
// @access  Private
export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds, workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена!')
	} // Если это делаем, то дальше программа идти не будет

	workout.name = name
	workout.exercises = exerciseIds

	const updatedWorkout = await workout.save()

	res.json(updatedWorkout)
})

// @desc    Delete workout
// @route   DELETE /api/workouts
// @access  Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const workout = await Workout.findById(workoutId)

	if (!workout) {
		res.status(404)
		throw new Error('Данная тренировка не найдена!')
	}

	await workout.remove()

	res.json({ message: `Workout ${workout.name} has been removed` })
})
