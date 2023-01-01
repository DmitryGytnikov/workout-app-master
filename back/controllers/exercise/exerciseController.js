import asyncHandler from 'express-async-handler'
import Exercise from '../../models/exerciseModel.js'

// @desc    Add new exercise Описание
// @route   Post /api/exercises Путь
// @access  Private Доступ - авторизованный пользователь
export const addNewExercise = asyncHandler(async (req, res) => {
	//Получаем данные:
	const { name, times, image } = req.body

	// Все запросы к БД - асинхронные функции
	const exercise = await Exercise.create({
		name,
		times,
		image,
	})

	res.json(exercise)
})
