import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'

// @desc    Update exercise log  //Обновление
// @route   PUT /api/exercises/log
// @access  Private
export const updateExerciseLog = asyncHandler(async (req, res) => {
	const { logId, timeIndex, key, value } = req.body //Получаем: Id, индекс подхода, что нужно поменять, на какое значение нужно поменять

	const currentLog = await ExerciseLog.findById(logId)

	if (!currentLog) {
		res.status(404)
		throw new Error('Данный лог не найден!') // Выдаем ошибку - если она сработала, то ретурна не будет, выполнение кода остановится
	}

	let newTimes = currentLog.times

	// if ((!timeIndex && timeIndex !== 0) || !key || (!value && value !== false)) {
	if (!timeIndex || !key || !value) {
		res.status(404)
		throw new Error('Вы не указали все поля!')
	}

	newTimes[timeIndex][key] = value // Перезаписываем

	currentLog.times = newTimes

	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})
