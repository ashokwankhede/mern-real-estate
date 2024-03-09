import express from 'express';
import userRoute from './routes/userRoutes.js';
import userAuth  from './routes/authUser.js';
import router from './routes/listingRoute.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';

import { errorHandler } from './utils/error.js';

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    dbName: 'real-estate-mern', 
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the MongoDB!");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api/user",userRoute);
app.use('/api/auth',userAuth);
app.use('/api/listing',router);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message  = err.message || "Internal Server Error";
    const status = err.status || false;

    return res.status(statusCode).json({
        status: status,
        message: message
    });
  });