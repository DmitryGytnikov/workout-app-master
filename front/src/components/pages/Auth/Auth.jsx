import React from 'react'
import Layout from '../../common/Layout'

import bgImage from '../../../images/auth-bg.png'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import Alert from '../../ui/Alert/Alert'

import { useMutation } from 'react-query'

import styles from './Auth.module.scss'
import { $api } from '../../../api/api'
import Loader from '../../ui/Loader'

const Auth = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [type, setType] = React.useState('auth') // auth, reg

	//useMutation() позволяет прокидывать данные (добавлять, обновлять), но не позволяет получать данные
	// mutate - ф-ция, позволяющая делать запросы
	// isLoading - отправляется автоматически когда идет загрузка, и можем лоадер показывать в это время
	//error  - будет приходить если будет ошибка
	const {
		mutate: register,
		isLoading,
		error,
	} = useMutation(
		'Registration',
		() =>
			$api({
				url: '/users',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				// Выполнится метод при успехе
				// successLogin(data.token)
				localStorage.setItem('token', data.token) //Записали токен

				// console.log(data)
			},
		}
	)

	//  React context + LS

	const handleSubmit = e => {
		e.preventDefault()

		if (type === 'auth') {
			console.log('Auth')
		} else {
			register()
			// console.log('Reg')
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Auth || Register' />
			<div className='wrapper-inner-page'>
				{/* Если есть ошибка, то */}
				{error && <Alert type='error' text={error} />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<Field
						placeholder='Enter password'
						value={password}
						onChange={({ target: { value } }) => setPassword(value)}
						required
					/>
					<div className={styles.wrapperButtons}>
						<Button text='Sign in' callback={() => setType('auth')} />
						<Button text='Sign up' callback={() => setType('reg')} />
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth

// import { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import Layout from '../../common/Layout'

// import bgImage from '../../../images/auth-bg.png'
// import Field from '../../ui/Field/Field'
// import Button from '../../ui/Button/Button'
// import Alert from '../../ui/Alert/Alert'
// import Loader from '../../ui/Loader'

// import { useMutation } from 'react-query'

// import styles from './Auth.module.scss'
// import { $api } from '../../../api/api'
// import { useAuth } from '../../../hooks/useAuth'

// const Auth = () => {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [type, setType] = useState('auth')

// 	const history = useHistory()
// 	const { setIsAuth } = useAuth()

// 	const successLogin = token => {
// 		localStorage.setItem('token', token)
// 		setIsAuth(true)

// 		setPassword('')
// 		setEmail('')

// 		history.replace('/')
// 	}

// 	const {
// 		mutate: register,
// 		isLoading,
// 		error,
// 	} = useMutation(
// 		'Registration',
// 		() =>
// 			$api({
// 				url: '/users',
// 				type: 'POST',
// 				body: { email, password },
// 				auth: false,
// 			}),
// 		{
// 			onSuccess(data) {
// 				successLogin(data.token)
// 			},
// 		}
// 	)

// 	const {
// 		mutate: auth,
// 		isLoading: isLoadingAuth,
// 		error: errorAuth,
// 	} = useMutation(
// 		'Auth',
// 		() =>
// 			$api({
// 				url: '/users/login',
// 				type: 'POST',
// 				body: { email, password },
// 				auth: false,
// 			}),
// 		{
// 			onSuccess(data) {
// 				successLogin(data.token)
// 			},
// 		}
// 	)

// 	const handleSubmit = e => {
// 		e.preventDefault()

// 		if (type === 'auth') {
// 			auth()
// 		} else {
// 			register()
// 		}
// 	}

// 	return (
// 		<>
// 			<Layout bgImage={bgImage} heading='Auth || Register' />
// 			<div className='wrapper-inner-page'>
// 				{error && <Alert type='error' text={error} />}
// 				{errorAuth && <Alert type='error' text={errorAuth} />}
// 				{(isLoading || isLoadingAuth) && <Loader />}
// 				<form onSubmit={handleSubmit}>
// 					<Field
// 						type='email'
// 						placeholder='Enter email'
// 						value={email}
// 						onChange={e => setEmail(e.target.value)}
// 						required
// 					/>
// 					<Field
// 						placeholder='Enter password'
// 						value={password}
// 						onChange={({ target: { value } }) => setPassword(value)}
// 						required
// 						type='password'
// 					/>
// 					<div className={styles.wrapperButtons}>
// 						<Button text='Sign in' callback={() => setType('auth')} />
// 						<Button text='Sign up' callback={() => setType('reg')} />
// 					</div>
// 				</form>
// 			</div>
// 		</>
// 	)
// }

// export default Auth
