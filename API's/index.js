import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.configDotenv();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to the MongoDB!")
})
.catch((error)=>{
    console.log("Please check the password string!")
    console.log(error);
});

const app = express();
const port = 3000;

app.listen(port,()=>{
   console.log(`Server is running on a ${port}`)
});