import express from  'express';
import mongoose from 'mongoose';
import User from './Models/User.js';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

dotenv.config()


const app = express();
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('connected to the database')
})
.catch((err)=>{
    console.log(err)
})

// app.get('/test',(req,res)=>{
//     res.json('test working')
// })


app.post('/api/register',async(req,res)=>{
    const{username,password} = req.body
    const hashPassword = bcrypt.hashSync(password,10)
    const newUser = new User({username,password:hashPassword})

    try {
        const createdUser =  await newUser.save();
        const token = jwt.sign({userId:createdUser._id},process.env.JWT_SECRET)
        res.cookie('token',token,{httpOnly:true}).status(200).json({success:'true',message:'User created'})
        
        
    } catch (error) {

        res.status(401).json({success:'false',message:'User not Created'})
        
    }

})



app.listen(3000,()=>{
    console.log('app is running in port 3000')
})