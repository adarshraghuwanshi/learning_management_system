import express from 'express';
const router = express.Router();
import { createQuiz, addQuestion, evaluateQuiz, showQuiz  } from '../controllers/QuizController.js';
import { protect, adminOnly } from '../middlewares/AuthMiddleware.js';

// Route for creating a quiz in a course only allowed for admins
router.post('/create-quiz/:courseId', protect, adminOnly, createQuiz);

// Route for adding a question to a quiz only allowed for admins
router.post('/add-question/:quizId', protect, adminOnly, addQuestion);

// Route for showing a quiz to users
router.get('/show-quiz/:quizId', protect, showQuiz);

// Route for evaluating a quiz attempt by a user
router.post('/evaluate-quiz/:quizId', protect, evaluateQuiz); 



export default router;