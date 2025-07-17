import express from 'express';
const router = express.Router();
import { createCourse, getAllCourses, getCourseById, enrollInCourse , userEnrolledCourses} from '../controllers/CourseController.js';
import { protect, adminOnly } from '../middlewares/AuthMiddleware.js';

// Course creation route only allowed for admins
router.post('/create-course', protect, adminOnly, createCourse);

// Route for fetching all courses
router.get('/get-allCourses',protect, getAllCourses);

//Fetch course by ID 
router.get('/getCourse/:id',protect, getCourseById);

// Route for enrolling in a course 
router.post('/enroll/:courseId', protect, enrollInCourse); 

//Route for fetching user enrolled courses
router.get('/user-courses',protect,userEnrolledCourses);


export default router;