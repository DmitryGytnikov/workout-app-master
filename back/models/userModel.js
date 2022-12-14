import mongoose from 'mongoose'
import bcrypt from 'bcryptjs' //Шифрует пароли

const userSchema = mongoose.Schema(
	{
		name: String,
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		images: {
			before: String,
			after: String,
		},
	},
	{
		minimize: false, // Если нет данных - поле все же возвращ-ся
		timestamps: true, // Марки
	}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password) //Сравнивать
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema) // Как будем к модели обращаться, схема

export default User
