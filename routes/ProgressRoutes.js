import express from 'express';
const router=express.Router();

import {markLecCompleted, checkProgress, quizAllAttempts} from '../controllers/ProgressController.js';
import { protect } from '../middlewares/AuthMiddleware.js';

// Route for marking a Lesson as completed by a user
router.post('/lesson-completed/:courseId/:lessonId', protect, markLecCompleted);

// Route for checking progress of a user in a course
router.get('/check-progress/:courseId', protect, checkProgress);

// Route for fetching quiz attempts of a user in a course
router.get('/quiz-allAttempts/:courseId/:quizId', protect, quizAllAttempts);



export default router;
