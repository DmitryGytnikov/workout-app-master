import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'

// @desc    Add new exerciseLog Описание
// @route   Post /api/exercises/log Путь
// @access  Private Доступ - авторизованный пользователь
//При клике на упражнение на странице workout будет лог создаваться и после этого идти редирект на его страницу
export const addNewExerciseLog = asyncHandler(async (req, res) => {
	//Получаем данные:
	const { exerciseId, times } = req.body //exerciseId - чтобы можно было вывести предыдущую тренировку

	let timesArray = []

	const prevExercises = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseId,
	}).sort('desc') //Сортируем по дате, чтобы сначала были новые

	//Берем самый свежий элемент списка prevExercises[0]
	if (prevExercises[0]) {
		timesArray = prevExercises[0].times
	} else {
		for (let i = 0; i < times; i++) {
			timesArray.push({
				weight: 0,
				repeat: 0,
			})
		}
	}

	//Все запросы к БД - асинхронные функции
	const exerciseLog = await ExerciseLog.create({
		user: req.user._id,
		exercise: exerciseId,
		times: timesArray,
	})

	res.json(exerciseLog)
	// res.json(true)
})
