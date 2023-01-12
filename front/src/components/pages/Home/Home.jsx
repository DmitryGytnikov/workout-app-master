import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'
// import Header from '../../common/Header/Header'
import styles from './Home.module.scss'
import bgImage from '../../../images/home-bg.jpg'

const Home = () => {
	return (
		<Layout height='100%' bgImage={bgImage}>
			{/* <div className={styles['home-wrapper']}> */}
			<Button text='New' type='main' callback={() => {}} />
			<h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
			<Counters />
		</Layout>
	)
}

export default Home
