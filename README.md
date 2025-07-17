#Learning Management System


# 📚 Learning Management System (LMS) - Backend

A full-featured **LMS backend** built with **Node.js**, **Express.js**, and **MongoDB**. This system supports authentication, course enrollment, lesson and quiz management, and real-time user progress tracking.

##  Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Authentication
- bcrypt.js for Password Hashing
- dotenv for Environment Management
- express-rate-limit (Rate Limiting)
- CORS

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Role-based Authorization (Admin/User)
- ✅ Course Creation & Enrollment
- ✅ Lesson Creation with Pagination
- ✅ Quiz Creation & Evaluation
- ✅ Track Lesson Completion & Quiz Attempts
- ✅ Pagination for Courses, Lessons, and Quizzes
- ✅ RESTful API design
- ✅ Rate Limiting Middleware

---

## 🗂️ Folder Structure

├── controllers/
├── models/
├── routes/
├── middlewares/
├── .env
├── index.js


## Installation & Running Locally


1.  git clone https://github.com/adarshraghuwanshi/learning_management_system 
2.  cd backend
3.  npm install
4.  nodemon index.js


The server will run at http://localhost:3000


# API Endpoints
## Auth
Method	Endpoint	                          Description
POST	/api/auth/signup	                  Register a new user
POST	/api/auth/login	                   Login and get JWT token

## Courses
Method	     Endpoint	                                      Description
POST	/api/course/create-course	               Create a new course (admin only)
GET	  /api/course/get-allCourses?page=1&limit=10	Fetch all courses (paginated)
GET	/api/course/getCourse/:id	                   Fetch a specific course by ID
POST	/api/course/enroll/:courseId	           Enroll in a course
GET	/api/course/user-courses	                   Get all user enrolled courses

## Lessons
Method	          Endpoint	                                                Description
POST	/api/lesson/create-lesson/:courseId	                Add lesson to course (admin only)
GET	/api/lesson/course-lessons/:courseId?page=1&limit=10	Get lessons of a course (paginated)

## Quizzes
Method	        Endpoint	                                             Description
POST	/api/quiz/create-quiz/:courseId                 	Create a quiz (admin only)
POST	/api/quiz/add-question/:quizId	                   Add a question to quiz (admin only)
GET	    /api/quiz/show-quiz/:quizId?page=1&limit=10	       View quiz (paginated questions)
POST	/api/quiz/evaluate-quiz/:quizId	                   Submit quiz answers

## Progress
Method	Endpoint	                                                   Description
POST /api/progress/lesson-completed/:courseId/:lessonId	           Mark lesson completed
GET	/api/progress/check-progress/:courseId	                  Check user’s progress in a course
GET	/api/progress/quiz-allAttempts/:courseId/:quizId	         Get all quiz attempts

## Middleware
protect: JWT authentication middleware
adminOnly: Role-based access control for admin users
rateLimit: Blocks excessive requests (100 per 15 mins)
