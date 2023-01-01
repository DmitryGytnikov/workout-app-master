import express from 'express' // Помогает сервер писать
import morgan from 'morgan' // Отображение в терминале всех запросов
import dotenv from 'dotenv' // Перезагрузка при изменении кода
import colors from 'colors' // Подсветка в консоли console.log

/* Config */
import { connectDB } from './config/db.js'

/* Middleware */
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

/* Routes */
import userRoutes from './routes/userRoutes.js' // Для бэка .js обязательно  писать
import exerciseRoutes from './routes/exerciseRoutes.js'

dotenv.config() // Чтобы везде работали переменные среды из process.env. в .env

connectDB() // Для коннекта БД

const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json()) // Настройки экспресс- ответ в json

/* Инициализация */
app.use('/api/users', userRoutes) // путь, роут
app.use('/api/exercises', exerciseRoutes) // путь, роут

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold // NODE_ENV - состояние проекта
	)
)
