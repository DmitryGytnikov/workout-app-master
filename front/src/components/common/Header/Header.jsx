import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'

import Hamburger from './Hamburger/Hamburger'

import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'

const Header = ({ backCallback }) => {
	const location = useLocation()
	const navigate = useNavigate()
	// debugger

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button
					type='button'
					onClick={() => {
						navigate(-1) // Возврат на страницу, где были до этого
					}}
				>
					<img src={arrowImage} alt='back' />
				</button>
			) : (
				<button type='button'>
					<img src={userImage} alt='Auth' />
				</button>
			)}
			<Hamburger />
		</header>
	)
}

export default Header
