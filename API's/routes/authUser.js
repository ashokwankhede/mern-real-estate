import express from 'express';
import { userAuthentication } from '../controller/userAuthController.js';

const userAuth = express.Router();

userAuth.post("/sign-up",userAuthentication);

export default userAuth;