import  mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    questionText: String,
    options:[{text: String, isCorrect: Boolean}],

});

const Question = mongoose.model('Question', questionSchema);
export default Question;