import asyncHandler from 'express-async-handler'
// import ExerciseLog from '../../models/exerciseLogModel.js'
import WorkoutLog from '../../models/workoutLogModel.js'
// import Workout from '../../models/workoutModel.js'

// @desc    Create new workout log
// @route   POST /api/workouts/log
// @access  Private
export const createNewWorkoutLog = asyncHandler(async (req, res) => {
	const { workoutId } = req.body

	const workoutLog = await WorkoutLog.create({
		user: req.user._id,
		workout: workoutId,
	})

	res.json(workoutLog)
})
