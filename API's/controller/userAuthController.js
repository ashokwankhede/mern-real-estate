import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const userAuthentication = async (req,res,next)=>{
    try{
    const {username,email,password} = req.body;
    console.log(`Received registration request for username: ${username}, email: ${email}, password: ${password}`);
    const hashedPasssword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPasssword});
    const user = await Promise.all([User.findOne({username:username,password:password})])[0];
    console.log(user);
    if (!user){
        await newUser.save();
        res.status(201).json({
        status:true,
        message:"User created successfully!"
        });
    } else{
        res.status(201).json({
            status:true,
            message:"User already Exist!"
        });
      };
    }
    catch (err){
        console.log(err);
        next(err);
    };
    
};

export const signIn = async (req,res,next) => {
    console.log("start sign in");
    try{
    const {email,password} = req.body;
    console.log(`Email: ${email}, Passowrd: ${password}`)
    const user = await User.findOne({email:email});
    console.log(user)
    if (!user) return res.status(400).json({status:false,message:"User not Found!"});
    const validPassword = bcrypt.compareSync(password,user.password);
    if (!validPassword) return res.status(401).json({status:false,message:"Wrong credentials!"});
    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN);
    
    const {password:pass,...rest} = user._doc;
    const updatedRest = {
        ...rest,
        status: true,
        message:"Sign in successfull"
      };
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(updatedRest)
    }
    catch (error){
        next(error);
    }
};

export const google = async (req, res,next) => {
    try {
        const {name,email,photoURL} = req.body;
        const user = await User.findOne({email: email});
        if (user) { 
            const token = jwt.sign({id: user._id},process.env.JWT_TOKEN);
            const {password:pass,...rest} = user._doc;
            const updatedRest = {
                ...rest,
                status: true,
                message:"Signed in successfully"
              };
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(updatedRest)
            

        } else {
            const {name,email,photoURL} = req.body;
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,10);
            const newUser = new User({username:name.split().join("")+Math.random().toString(36).slice(-4),email,avatar:photoURL,password:hashedPassword});
            await newUser.validate();
            await newUser.save();
            const token = jwt.sign({id: newUser._id},process.env.JWT_TOKEN);
            const {password:pass,...rest} = newUser._doc;
            const updatedRest = {
                ...rest,
                status: true,
                message:"User saved successfully"
              };
            res 
               .cookie('access_token',token,{httpOnly:true})
               .statusCode(200)
               .json(updatedRest);
        }

    } catch (error) {
        next(error);
    }

};

