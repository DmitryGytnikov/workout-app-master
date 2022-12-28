import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

//Проверка, что авторизован человек, этот мидлвэр от гостей защищает
export const protect = asyncHandler(async (req, res, next) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		// Правило авторизации - д.б. строка 'Bearer' в начале
		token = req.headers.authorization.split(' ')[1] //Этим получаем знач-ие токена, стоящее после 'Bearer'

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN) //Декодируем

		const userFound = await User.findById(decoded.userId).select('-password') // всё выбираем, кроме пароля

		if (userFound) {
			req.user = userFound
			next() //Т.е. возвращаем, идем дальше
		} else {
			res.status(401)
			throw new Error('Не авторизован, токен не работает')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Не авторизован, без токена')
	}
})
