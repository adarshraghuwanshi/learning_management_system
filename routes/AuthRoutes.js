import Express from 'express';
import { signup, login } from '../controllers/AuthController.js';

const router = Express.Router();

//Route for User Register  
router.post('/signup', signup);

// Route for User Login       
router.post('/login', login);


export default router;