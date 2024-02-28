import express from 'express';
import { userAuthentication,signIn } from '../controller/userAuthController.js';

const userAuth = express.Router();

userAuth.post("/sign-up",userAuthentication);
userAuth.post("/sign-in",signIn)

export default userAuth;