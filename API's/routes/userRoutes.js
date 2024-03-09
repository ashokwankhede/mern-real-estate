import express from 'express';
import { updateUser,deleteUser,LogOutUser } from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

const userRoute = express.Router();
userRoute.post('/update/:id',verifyUser,updateUser);
userRoute.delete('/delete/:id',verifyUser,deleteUser);
userRoute.post('/logout',LogOutUser);

export default userRoute;