import express from  'express';
import mongoose from 'mongoose';
import User from './Models/User.js';
import dotenv from 'dotenv'

dotenv.config()


const app = express();

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('connected to the database')
})
.catch((err)=>{
    console.log(err)
})

app.get('/test',(req,res)=>{
    res.json('test working')
})

app.listen(3000,()=>{
    console.log('app is running in port 3000')
})