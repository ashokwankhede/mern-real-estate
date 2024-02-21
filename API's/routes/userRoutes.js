import express from 'express';
import {test} from '../controller/userController.js'

const userRoute = express.Router();

userRoute.get('/test',test);

export default userRoute;