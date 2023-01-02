import asyncHandler from 'express-async-handler'
import Exercise from '../../models/exerciseModel.js'

// @desc    Add new exercise Описание
// @route   Post /api/exercises Путь
// @access  Private Доступ - авторизованный пользователь
export const addNewExercise = asyncHandler(async (req, res) => {
	//Получаем данные:
	const { name, times, imageId } = req.body
	// Самомтоятельно Заменил image на imageId - Макс этого не делал; сделал, чтобы в инсомнии работал этот пост-запрос и создавался документ новый в БД

	// Все запросы к БД - асинхронные функции
	const exercise = await Exercise.create({
		name,
		times,
		imageId, // Самомтоятельно Заменил image на imageId
	})

	res.json(exercise)
})
