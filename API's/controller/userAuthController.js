import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'


export const userAuthentication = async (req,res,next)=>{
    try{
    const {username,email,password} = req.body;
    console.log(`Received registration request for username: ${username}, email: ${email}, password: ${password}`);
    const hashedPasssword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPasssword});
    await newUser.save();
    res.status(201).json({
        status:true,
        message:"User created successfully!"
    })
    }
    catch (err){
        console.log(err);
        next(err);
    }
};