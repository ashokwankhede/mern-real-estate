import express from 'express';
import userRoute from './routes/userRoutes.js';
import userAuth  from './routes/authUser.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    dbName: 'real-estate-mern', 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the MongoDB!");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api/user",userRoute);
app.use('/auth',userAuth);