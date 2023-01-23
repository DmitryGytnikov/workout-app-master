import axios from 'axios'

// Создаем инстанс axios
const instance = axios.create({
	//Где сервер находится
	baseURL: '/api',
	//Чтобы сервер понял, что отправляем в json-формате
	headers: {
		'Content-Type': 'application/json',
	},
})

//$api - внешняя функция
export const $api = async ({ url, type = 'GET', auth = true, body }) => {
	if (auth) {
		// Если требуется авторизация, то
		const token = localStorage.getItem('token') // токен берем из localStorage
		instance.defaults.headers.common['Authorization'] = token // загружаем в хедер авторизации, в хедер запроса, чтобы сервер понял, что мы авторизованы
		// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}
	let data

	//Отлавливает все исключения
	try {
		switch (type) {
			case 'GET':
			default:
				data = await instance.get(url)
				break

			case 'POST':
				data = await instance.post(url, body)
				break

			case 'PUT':
				data = await instance.put(url, body)
				break

			case 'DELETE':
				data = await instance.delete(url)
				break
		}
		return data.data
	} catch (error) {
		throw error.response && error.response.data
			? error.response.data.message
			: error.message
		//Ошибка отправляется, чтобы мы могли ее вывести
	}
}
