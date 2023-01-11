import React from 'react'
import styles from './Header.module.scss'

import hamburgerImage from '../../../images/header/hamburger.svg'
import userImage from '../../../images/header/user.svg'

const Header = () => {
	return (
		<header className={styles.header}>
			<button type='button'>
				<img src={userImage} alt='Auth' />
			</button>

			<button type='button'>
				<img src={hamburgerImage} alt='' />
			</button>
		</header>
	)
}

export default Header
