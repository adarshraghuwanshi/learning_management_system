import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  name: String,
  email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
  password: {
        type: String,
        required: [true, "Password is required"],
        
    },
  isAdmin: { type: Boolean, default: false },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();

    const salt= await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password, salt);    
    next();
}
);
const User = mongoose.model('User', userSchema);
export default User;
