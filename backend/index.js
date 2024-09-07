import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routers/auth.router.js';
import cookieParser from 'cookie-parser';

mongoose.connect('mongodb+srv://test:test@cluster0.p6muf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
const PORT=3000;
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
app.use('/api/auth',authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });
  