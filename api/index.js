import express, { json } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import User from './Model/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()


const app = express();

app.use(express.json())
app.use(cookieParser())

// app.get('/test',(req,res)=>{
//     res.json('test okay!')
// })

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

mongoose.connect(process.env.MONGODB).then(()=>console.log('database is connected')).catch((err)=>console.log(err))

app.post('/api/register',async (req,res)=>{

    const {username,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10)
    const newUser = new  User({username,password:hashedPassword})
    try {
        const createdUser = await newUser.save()

       const token = jwt.sign({userId:createdUser._id,username},process.env.JWT_SECRET)
       
        res.cookie('token',token,{ httpOnly: true }).status(200).json({success:"true" ,message:"User created" ,id:createdUser._id})

       
        
    } catch (error) {
        res.status(401).json({success:"false" ,message:"User not  created"})
        
    }
    
})



app.post('/api/login',async (req,res)=>{
    const{username,password} = req.body
    const findUser = await User.findOne({username})
    if(findUser){
        const comparePassword = bcrypt.compareSync(password,findUser.password)

        if(comparePassword){
            const token = jwt.sign({id:findUser._id,username},process.env.JWT_SECRET)
            res.cookie('token',token,{ httpOnly: true }).status(200).json({success:"true" ,message:"User created" ,id:findUser._id})

        }
        else{
            res.status(401).json({success:"false" ,message:"Incorrect password"})
        }
    }
    else{
        res.status(401).json({success:"false" ,message:"User not found"})

    }
})




app.get('/api/profile',(req,res)=>{
    const token = req.cookies?.token
  if(token){
    jwt.verify(token,process.env.JWT_SECRET,{},(err,userData)=>{
        if(err) throw err
        
        res.json(userData)
        
    })
  }
    else{
        res.status(401).json('Unauthorized')
    }
  
})

app.listen(3000,()=>{
    console.log('server is running in port 3000')
})