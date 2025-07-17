import express from 'express';
const router = express.Router();
import { createLesson, getLessonByCourseId } from '../controllers/LessonController.js';
import { protect, adminOnly } from '../middlewares/AuthMiddleware.js';
import { get } from 'mongoose';

// Route for creating a lesson in a course only allowed for admins
router.post('/create-lesson/:courseId', protect, adminOnly, createLesson);
router.get('/course-lessons/:courseId', protect, getLessonByCourseId);


export default router;