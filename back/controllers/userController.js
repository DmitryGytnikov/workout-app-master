// @desc    Get user profile Описание
// @route   GET /api/users/profile Путь
// @access  Private Доступ - авторизованный пользователь
export const getUserProfile = (req, res) => {
	// Получаем всех юзеров
	const user = {
		name: 'Max',
		age: 21,
	}

	res.json(user) // Уже включен статус 200, не нужно его писать
}
