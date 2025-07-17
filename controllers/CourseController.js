import Course from '../models/Course.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';

export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    
    const course = await Course.create({ title, description, instructor, price });
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}





export const getAllCourses = async (req, res) => {
  try {
    // Pagination logic
    // Show Number(limit) courses per page and show which page(page) of courses
    const page = Number(req.query.page) || 1;     
    const limit = Number(req.query.limit) || 10;  
    const skip = (page - 1) * limit;

    const totalCourses = await Course.countDocuments();

    const courses = await Course.find({})
      .skip(skip)
      .limit(limit);



    res.status(200).json({
      courses,
      page,
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses
    }

    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // const userId = req.user._id; 
    // const user= await User.findById(userId);
    const user=req.user;
    

    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'User already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

  const progress = await Progress.create({ 
    user:user._id, 
    course:courseId, 
    lessonsCompleted: [],
    quizAttempts: [],
    courseProgress: '0%'
  });




    res.status(200).json({ message: 'Successfully enrolled in the course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const userEnrolledCourses = async (req, res) => {
  try {
    const user = req.user; 

    if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
      return res.status(404).json({ message: 'No enrolled courses found' });
    }

    const courses = await Course.find({ _id: { $in: user.enrolledCourses } });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};