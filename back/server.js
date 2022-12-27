import express from 'express' // Помогает сервер писать
import morgan from 'morgan' // Отображение в терминале всех запросов
import dotenv from 'dotenv'
import colors from 'colors' // Подсветка в консоли console.log

/* Config */
import { connectDB } from './config/db.js'

/* Routes */
import userRoutes from './routes/userRoutes.js' // Для бэка .js обязательно  писать

dotenv.config() // Чтобы везде работали переменные среды из .env

connectDB() // Для коннекта БД

const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json()) // Настройки экспресс- ответ в json

/* Инициализация */
app.use('/api/users', userRoutes) // путь, роут

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold // NODE_ENV - состояние проекта
	)
)
