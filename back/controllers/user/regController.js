import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler' // Выводит ошибки при наличии
// import { generateToken } from '../../helpers/generateToken.js'

// @desc    Register user
// @route   POST /api/users
// @access  Public Регистрация не нужна
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await User.findOne({ email }) // Сокращение email : email

	if (isHaveUser) {
		res.status(400) //Неправильный запрос
		throw new Error('Данный пользователь уже зарегистрирован')
	}

	// Производим регистрацию
	const user = await User.create({
		email,
		password,
	})

	//Create token

	res.json(user) //Отдаем юзера, к-го зарегали
})
