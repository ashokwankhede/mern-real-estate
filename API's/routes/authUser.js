import express from 'express';
import { userAuthentication,signIn,google } from '../controller/userAuthController.js';

const userAuth = express.Router();

userAuth.post("/sign-up",userAuthentication);
userAuth.post("/sign-in",signIn);
userAuth.post("/google",google);


export default userAuth;