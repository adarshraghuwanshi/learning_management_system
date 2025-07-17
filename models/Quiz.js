import mongoose from 'mongoose';
const quizSchema = new mongoose.Schema({
    title: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    questions:[{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
});
const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;