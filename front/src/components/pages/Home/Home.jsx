import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'
// import Header from '../../common/Header/Header'
import bgImage from '../../../images/home-bg.jpg'
import styles from './Home.module.scss'
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const navigate = useNavigate()

	return (
		<Layout bgImage={bgImage}>
			{/* <div className={styles['home-wrapper']}> */}
			{/* <Link to='/new-workout'>erf</Link> */}
			<Button
				text='New'
				type='main'
				callback={() => {
					navigate('/new-workout')
				}}
			/>
			<h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
			<Counters />
		</Layout>
	)
}

export default Home
