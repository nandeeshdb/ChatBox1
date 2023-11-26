import express, { json } from 'express'
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv'
import User from './Model/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ws, { WebSocketServer } from 'ws'


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
    const foundUser = await User.findOne({username})
    if(foundUser){
        const passok = bcrypt.compareSync(password,foundUser.password)
        if(passok){
            jwt.sign({userId:foundUser._id,username},process.env.JWT_SECRET,{},(err,token)=>{
                if(err) throw err
                res.cookie('token',token,  {sameSite:'none', secure:true}).json({
                    id:foundUser._id
                })
            })
        }
    }
  })





app.get('/api/profile',(req,res)=>{
    const {token} = req.cookies
   if(token){
    jwt.verify(token,process.env.JWT_SECRET,{},(err,userData)=>{
        if(err) throw err
        res.json(userData)
        
    })
   }

   else{
    res.status(401).json('no token')
   }
})







const server = app.listen(3000)
const wss = new WebSocketServer({server})
wss.on('connection',(connection,req)=>{
    const cookies = req.headers.cookie;

    if(cookies){
        const tokenCookieString = cookies.split(';').find(str=> str.startsWith('token'))
        if(tokenCookieString){
            const token = tokenCookieString.split('=')[1]
            if(token){
                jwt.verify(token,process.env.JWT_SECRET,{},(err,userData)=>{
                    if(err) throw err
                    const{username,userId} =userData
                    connection.userId = userId;
                    connection.username = username
                })
            }

        
        }
    }

})

