

#  Learning Management System (LMS) - Backend

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

##  Features

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

##  Folder Structure

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

- To login as admin:
{
"email": "adarsh@gmail.com",
"password":"adarsh123"
}


# API Endpoints
## Auth ROute
### signup Route- Register as new user
POST	   /api/auth/signup	        

<img width="1261" height="381" alt="image" src="https://github.com/user-attachments/assets/2518894d-7622-435f-a15d-654e966f4b77" />

### login Route- login as existing user and get jwt token
POST	/api/auth/login	
<img width="1294" height="434" alt="image" src="https://github.com/user-attachments/assets/68062eea-7b27-4a0c-8d2f-fa17a4dc105b" />

## Note- All API routes are protected.
You must include the following header with every request after logging in:
### Authorization: Bearer <your_token_here>


## Courses Routes 
###  Create a new course (admin only)
POST	/api/course/create-course	      
<img width="1258" height="448" alt="image" src="https://github.com/user-attachments/assets/35ed3152-3a34-4b9d-91d5-5015c9d5b310" />


### Fetch all courses (paginated)
GET	  /api/course/get-allCourses?page=1&limit=10	
<img width="1290" height="461" alt="image" src="https://github.com/user-attachments/assets/beb5c355-2ec2-4f47-ace1-2702502c00d8" />


### Fetch a specific course by ID
GET	/api/course/getCourse/:id	  
<img width="1309" height="381" alt="image" src="https://github.com/user-attachments/assets/4a16b8a2-d654-4d8a-acfe-0546524414bf" />



###  Enroll in a course
POST	/api/course/enroll/:courseId	        

###  Get all user enrolled courses
GET	/api/course/user-courses	                

## Lessons

### Add lesson to course (admin only)
POST	/api/lesson/create-lesson/:courseId	    
<img width="1280" height="833" alt="image" src="https://github.com/user-attachments/assets/c931dfaa-85ec-4e8d-b7fc-1f3b61b54bb8" />

### Get lessons of a course (paginated)
GET	/api/lesson/course-lessons/:courseId?page=1&limit=10	
<img width="1318" height="818" alt="image" src="https://github.com/user-attachments/assets/6e4e367e-9e07-4ace-bc42-0299591791c0" />


## Quizzes
### Create a quiz (admin only)
POST	/api/quiz/create-quiz/:courseId
<img width="1268" height="754" alt="image" src="https://github.com/user-attachments/assets/2e2d718f-ed22-4da4-9085-9d370d1db75c" />


### Add a question to quiz (admin only)
POST	/api/quiz/add-question/:quizId	
<img width="1341" height="839" alt="image" src="https://github.com/user-attachments/assets/b54af7e2-16fc-42fd-9d21-f613643b742f" />


###  View quiz (paginated questions)
GET	    /api/quiz/show-quiz/:quizId?page=1&limit=10	
<img width="1303" height="811" alt="image" src="https://github.com/user-attachments/assets/e3366e87-b1f4-4598-bbff-6d09e18bb06e" />



###    Submit quiz answers
POST	/api/quiz/evaluate-quiz/:quizId	  
<img width="1265" height="762" alt="image" src="https://github.com/user-attachments/assets/bebcd7f0-4b72-44f8-ad90-efbae2548e4f" />


## Progress
### Mark lesson completed
POST /api/progress/lesson-completed/:courseId/:lessonId	     
<img width="1285" height="636" alt="image" src="https://github.com/user-attachments/assets/fa03f34c-f070-4246-a809-0dcc66757484" />

### Check user’s progress in a course
GET	/api/progress/check-progress/:courseId	   
<img width="1279" height="789" alt="image" src="https://github.com/user-attachments/assets/62a87850-bf01-42a9-bb85-2e96c78f359e" />

###  Get all attempts of quiz
GET	/api/progress/quiz-allAttempts/:courseId/:quizId	  
<img width="1263" height="816" alt="image" src="https://github.com/user-attachments/assets/56ed9e48-ed80-49b5-9358-c45c0814e13c" />


## Middleware
protect: JWT authentication middleware
adminOnly: Role-based access control for admin users
rateLimit: Blocks excessive requests (100 per 15 mins)
