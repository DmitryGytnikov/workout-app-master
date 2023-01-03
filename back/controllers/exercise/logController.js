import asyncHandler from 'express-async-handler'
import { reBuildTimes } from '../../helpers/exerciseLog.js'
import ExerciseLog from '../../models/exerciseLogModel.js'

// @desc    Create new exerciseLog Описание
// @route   Post /api/exercises/log Путь
// @access  Private Доступ - авторизованный пользователь
//При клике на упражнение на странице workout будет лог создаваться и после этого идти редирект на его страницу
export const createNewExerciseLog = asyncHandler(async (req, res) => {
	//Получаем данные:
	const { exerciseId, times } = req.body //exerciseId - чтобы можно было вывести предыдущую тренировку

	let timesArray = []

	for (let i = 0; i < times; i++) {
		timesArray.push({
			weight: 0,
			repeat: 0,
		})
	}

	//Все запросы к БД - асинхронные функции
	const exerciseLog = await ExerciseLog.create({
		user: req.user._id,
		exercise: exerciseId,
		times: timesArray,
	})

	res.json(exerciseLog)
})

// @desc    Get exerciseLog
// @route   GET /api/exercises/log/:id
// @access  Private
export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await ExerciseLog.findById(req.params.id)
		.populate('exercise', 'name imageId') // Указываем, что нужно взять
		.lean() // Чтобы стало Обджектом

	// if (!exerciseLog) {
	// 	res.status(404)
	// 	throw new Error('Лог не найден!')
	// }

	const prevExerciseLogs = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseLog._id,
		// exercise: exerciseLog.exercise._id,
		// completed: true,
		// }).sort({ createdAt: 'desc' })
	}).sort('desc')

	const prevExLog = prevExerciseLogs[0]

	let newTimes = reBuildTimes(exerciseLog)

	if (prevExLog) newTimes = reBuildTimes(exerciseLog, prevExLog)

	res.json({
		...exerciseLog,
		times: newTimes,
	})
	res.json(exerciseLog)
})
