import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const userAuthentication = async (req,res,next)=>{
    try{
    const {username,email,password} = req.body;
    console.log(`Received registration request for username: ${username}, email: ${email}, password: ${password}`);
    const hashedPasssword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPasssword});
    const user = await Promise.all([User.findOne({username}), User.findOne({email})]);
    if (!user){
        await newUser.save();
        res.status(201).json({
        status:true,
        message:"User created successfully!"
        })
    } else{
        res.status(201).json({
            status:true,
            message:"User already Exist!"
        })
      }
    }
    catch (err){
        console.log(err);
        next(err);
    }
    
};

export const signIn = async (req,res,next) => {
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if (!user) return res.status(400).json({status:true,mesage:"User not Found!"});
    const validPassword = bcrypt.compareSync(password,user.password);
    if (!validPassword) return res.status(401).json({status:true,mesage:"Wrong credentials!"});
    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN);
    const {password:pass,...rest} = user._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    }
    catch (error){
        next(error);
    }
}