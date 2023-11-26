import express from  'express';
import mongoose from 'mongoose';
import User from './Models/User.js';
import dotenv from 'dotenv'
import User from './Model/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'

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

app.post('/api/register', async (req,res) => {
    const {username,password} = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        username:username,
        password:hashedPassword,
      });
      jwt.sign({userId:createdUser._id,username}, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
          id: createdUser._id,
          success : "true"
        });
      });
    } catch(err) {
      if (err) throw err;
      res.status(500).json({success : "false"});
    }
  });





  app.post('/api/login',async(req,res)=>{

    const{username,password} = req.body
    const hashPassword = bcrypt.hashSync(password,10)
    const newUser = new User({username,password:hashPassword})

    try {
        const createdUser =  await newUser.save();
        const token = jwt.sign({userId:createdUser._id},process.env.JWT_SECRET)
        res.cookie('token',token,{httpOnly:true}).status(200).json({success:'true',message:'User created'})
        
        
    } catch (error) {

        res.status(401).json({success:'false',message:'User not Created'})
        throw(error)
        
    }

})



app.listen(3000,()=>{
    console.log('app is running in port 3000')
})