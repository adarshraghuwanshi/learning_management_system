import mongoose from 'mongoose';
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructorName: String,
  price: Number,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});
const Course = mongoose.model('Course', courseSchema);
export default Course;