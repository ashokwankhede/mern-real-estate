import express from 'express';
import {test} from '../controller/userController.js';
import { updateUser } from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const userRoute = express.Router();

userRoute.get('/test',test);
userRoute.post('/update/:id',verifyUser,updateUser);

export default userRoute;