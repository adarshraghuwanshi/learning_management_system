import mongoose from 'mongoose';
const lessonSchema= new mongoose.Schema({
    title: String,
    videoUrl: String,
    resourceLinks: [String],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },

});
const Lesson= mongoose.model('Lesson', lessonSchema);
export default Lesson;