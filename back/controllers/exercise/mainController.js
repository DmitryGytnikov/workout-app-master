import asyncHandler from 'express-async-handler'
import Exercise from '../../models/exerciseModel.js'

// @desc    Create new exercise Описание
// @route   Post /api/exercises Путь
// @access  Private Доступ - авторизованный пользователь
export const createNewExercise = asyncHandler(async (req, res) => {
	//Получаем данные:
	const { name, times, imageId } = req.body
	// Самоcтоятельно Заменил image на imageId - Макс этого не делал; сделал, чтобы в инсомнии работал этот пост-запрос и создавался документ новый в БД

	// Все запросы к БД - асинхронные функции
	const exercise = await Exercise.create({
		name,
		times,
		imageId, // Самомтоятельно Заменил image на imageId
	})

	res.json(exercise)
})

// @desc    Update exercise
// @route   PUT /api/exercises
// @access  Private
export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, imageId, exerciseId } = req.body

	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данное упражнение не найдено!')
	}

	exercise.name = name
	exercise.times = times
	exercise.imageId = imageId // Самомтоятельно Заменил image на imageId

	const updatedExercise = await exercise.save()

	res.json(updatedExercise)
})
