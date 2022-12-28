import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'

// @desc    Auth user Вход в систему
// @route   POST /api/users/login
// @access  Public Регистрация не нужна
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	//Если есть user и с паролями все OK
	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id)
		res.json({ user, token })
	} else {
		res.status(401)
		throw new Error('Неправильный email или пароль')
	}
})
