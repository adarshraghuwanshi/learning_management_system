import Course from '../models/Course.js';
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import Progress from '../models/Progress.js';

export const createQuiz = async (req, res) => {
    try{
    const { courseId } = req.params;
    const { title} = req.body;

    const course = await Course.findById(courseId);

    //check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // create quiz
    const quiz = await Quiz.create({
        title: title,
        course: courseId,
        questions: [] 
    });

    // Add lesson to the course's lessons array
    course.quizzes.push(quiz._id);
    await course.save();


    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
  }

  export const addQuestion = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { questionText, options, correctAnswer } = req.body;

        const quiz = await Quiz.findById(quizId);
        // Check if quiz exists
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        // Create question
        const question = await Question.create({
            questionText: questionText,
            options: options,
            correctAnswer: correctAnswer,
            quiz: quizId
        });

        // Add question to the quiz's questions array
        quiz.questions.push(question._id);
        await quiz.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

export const showQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const user= req.user;

        // Pagination logic
       const page = Number(req.query.page) || 1;     
       const limit = Number(req.query.limit) || 10;  
       const skip = (page - 1) * limit;

        const quiz = await Quiz.findById(quizId).populate('questions')
        .skip(skip)
        .limit(limit);

        // Check if quiz exists
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        if(!user.enrolledCourses.includes(quiz.course.toString())) {
            return res.status(400).json({ message: 'User not enrolled in this course' });
        }

        

        res.status(200).json({
            quiz,
            page,
            totalPages: Math.ceil(quiz.questions.length / limit),
            totalQuestions: quiz.questions.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const evaluateQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body;
        const user = req.user;


        const quiz = await Quiz.findById(quizId).populate('questions');

        // Check if quiz exists
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        if(!user.enrolledCourses.includes(quiz.course.toString())) {
            return res.status(400).json({ message: 'User not enrolled in this course' });
        }

        let score = 0;
        // Calculate score based on answers
        quiz.questions.forEach((question) => {
            const userAnswer = answers.find(answer => answer.questionId.toString() === question._id.toString());
            if(userAnswer){
                let selectedOption;
                if (userAnswer.selectedOptionIndex !== undefined) {
                    selectedOption = question.options[userAnswer.selectedOptionIndex];
                } 
                else if (userAnswer.selectedOptionText) {
                    selectedOption = question.options.find(
                        o => o.text === userAnswer.selectedOptionText
                    );
                }
                if (selectedOption && selectedOption.isCorrect) score += 1;

            }
        });
        const totalMarks = quiz.questions.length;
        const percentage = (score / totalMarks) * 100;
        
        // Update user's progress
        const progress = await Progress.findOne({ user: user._id, course: quiz.course });
        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        progress.quizAttempts.push({ quiz: quizId, score:percentage+'%', timeStamp: new Date() });
        await progress.save();

        

        res.status(200).json({ message: 'Quiz attempted successfully',score: percentage+'%' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
