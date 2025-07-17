import Progress from '../models/Progress.js';
import Course from '../models/Course.js';


export const markLecCompleted = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const user = req.user; 

    if(!courseId || !lessonId) {
      return res.status(400).json({ message: 'correct Course ID and Lesson ID are required' });
    }
    

    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User not enrolled in this course' });
    }
    const course= await Course.findById(courseId);
    if(!course.lessons.includes(lessonId)){
      return res.status(400).json({ message: 'Lesson not found in this course' });
    }


    const progress = await Progress.findOne({ user: user._id, course: courseId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    // Check if the lesson is already marked as completed
    if (progress.lessonsCompleted.includes(lessonId)) { 
        return res.status(400).json({ message: 'Lesson already marked as completed' });
        }
    // Mark the lesson as completed
    progress.lessonsCompleted.push(lessonId);   
    await progress.save();

    // Update course progress
    const totalLessons = course.lessons.length; 
    const completedLessons = progress.lessonsCompleted.length;
    progress.courseProgress = ((completedLessons / totalLessons) * 100)+'%';
    await progress.save();

    res.status(200).json({ message: 'Lecture marked as completed', courseProgress: progress.courseProgress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


    


export const checkProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = req.user; 

    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User not enrolled in this course' });
    }

    // Fetch progress data for the user in the specified course
    const progress = await Progress.findOne({ user: user._id, course: courseId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const quizAllAttempts = async (req, res) => {
  try {
    const { courseId, quizId } = req.params;
    const user = req.user; 

    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User not enrolled in this course' });
    }

    // Fetch all quiz attempts for the user in the specified course
    const progress = await Progress.findOne({ user: user._id, course: courseId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const quizAttempts = progress.quizAttempts.filter(attempt => attempt.quiz.toString() === quizId);
    res.status(200).json(quizAttempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};