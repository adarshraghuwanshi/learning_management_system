import mongoose from 'mongoose';
const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lessonsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    quizAttempts:[{
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        score: String,
        timeStamp: Date,
    }],
    courseProgress: {
        type: String,
        default: '0%', 
    },

});
const Progress = mongoose.model('Progress', progressSchema);
export default Progress;