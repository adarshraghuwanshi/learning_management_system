import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js';
import CourseRoutes from './routes/CourseRoutes.js';
import LessonRoutes from './routes/LessonRoutes.js';
import QuizRoutes from './routes/QuizRoutes.js';
import ProgressRoutes from './routes/ProgressRoutes.js';

import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.get('/', (req, res) => {
    res.send('Welcome to the Learning Management System API');  
});

// Rate limiting middleware only allows 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, try again later.'
});

app.use('/api/', apiLimiter);



//All Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/course', CourseRoutes);
app.use('/api/lesson', LessonRoutes);
app.use('/api/quiz', QuizRoutes);
app.use('/api/progress', ProgressRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose
.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { console.log('Connected to MongoDB');})
.catch((error) => {console.error('Error connecting to MongoDB:', error);}); 
