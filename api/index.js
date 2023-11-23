import express from  'express';

const app = express;

app.get('/test',(req,res)=>{
    res.json('test working')
})

app.listen(3000,()=>{
    console.log('app is running in port 3000')
})