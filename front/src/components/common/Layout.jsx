import React from 'react'
import cn from 'classnames'

import Header from './Header/Header'

import styles from './Layout.module.scss'

const Layout = ({ children, bgImage, heading = '' }) => {
	return (
		<div
			className={cn(styles.wrapper, {
				[styles.otherPage]: !!heading,
			})}
			// Стили по умолчанию, и стили - при условии, что есть heading
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<Header />
			{heading && <h1 className={styles.heading}>{heading}</h1>}
			{children && <div>{children}</div>}{' '}
			{/* Если есть children, то div добавить*/}
		</div>
	)
}

export default Layout

// const Layout = ({ children, bgImage, heading = '', backLink = '/' }) => {
// 	return (
// 		<div
// 			className={cn(styles.wrapper, {
// 				[styles.otherPage]: !!heading,
// 			})}
// 			style={{ backgroundImage: `url(${bgImage})` }}
// 		>
// 			<Header backLink={backLink} />
// 			{heading && <h1 className={styles.heading}>{heading}</h1>}
// 			{children && <div>{children}</div>}
// 		</div>
// 	)
// }
