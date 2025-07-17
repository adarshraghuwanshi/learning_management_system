import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

export const createLesson = async (req, res) => {
    try{
    const { courseId } = req.params;
    const { title, videoUrl, resourceLinks } = req.body;

    const course = await Course.findById(courseId);

    //check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // create lesson
    const lesson = await Lesson.create({
      title,
      videoUrl,
      resourceLinks: resourceLinks || [],
      course: courseId
    });

    // Add lesson to the course's lessons array
    course.lessons.push(lesson._id);
    await course.save();


    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
  }

  export const getLessonByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;

    // Pagination logic
    const page = Number(req.query.page) || 1;     
    const limit = Number(req.query.limit) || 10;  
    const skip = (page - 1) * limit;

        // Find lessons by course ID
        const lessons = await Lesson.find({ course: courseId })
        .skip(skip)
        .limit(limit);
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this course' });
        }
        const totalLessons = await Lesson.countDocuments({ course: courseId });

        res.status(200).json({
          lessons,
          page,
          totalPages: Math.ceil(totalLessons / limit),
          totalLessons
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }     
  }
