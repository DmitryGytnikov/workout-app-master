// import cn from 'classnames'
import React from 'react'
import styles from './Counters.module.scss'

const counters = {
	minutes: 7,
	workouts: 1,
	kgs: 5,
}

const Counters = () => {
	return (
		<div className={styles.wrapper}>
			{Object.entries(counters).map(item => (
				<div className={styles.count} key={'_key_' + item[0]}>
					<div className={styles.heading}>{item[0]}</div>
					<div className={styles.number}>{item[1]}</div>
				</div>
			))}
		</div>
	)
}

export default Counters

// const Counters = ({ minutes, workouts, kgs, type }) => {
// 	return (
// 		<div
// 			className={cn(styles.wrapper, {
// 				[styles.profile]: type === 'profile',
// 			})}
// 		>
// 			<div className={styles.count}>
// 				<div className={styles.heading}>Minutes</div>
// 				<div className={styles.number}>{minutes}</div>
// 			</div>
// 			<div className={styles.count}>
// 				<div className={styles.heading}>Workouts</div>
// 				<div className={styles.number}>{workouts}</div>
// 			</div>
// 			<div className={styles.count}>
// 				<div className={styles.heading}>Kgs</div>
// 				<div className={styles.number}>{kgs}</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Counters
