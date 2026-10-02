import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';


const app=express();
app.use(cors());
app.use(express.json())




const JWT_TOKEN=process.env.JWT_TOKEN;
const users=[{id:1,username:'Kashyap',password:'Kashyap123'},{id:2,username:'Aditya',password:'Aditya123'}]

app.get('/',authenticate, (req,res) => {
    res.send(users);
});

 app.post("/",(req,res) => {
     const {username,password}=req.body;
     const user = users.find(u=> u.username===username && u.password===password);
     if (!user) return res.status(401).json({error:"Invalid User"})
     const userToken=jwt.sign({id:user.id},JWT_TOKEN,{expiresIn:'1h'});
     res.json({userToken:userToken});

 });

function authenticate(req,res,next) {
    const header=req.get('Authorization')
    const token =header && header.split(' ')[1]
    if (!token) return res.status(401).json({error:'Token required'});
    jwt.verify(token,JWT_TOKEN,(err,user)=> {
        if (err) return res.status(402).json({error:"Invalid Token"})
        req.user=user;
        next();
    })
}
app.get('/login',(req,res) => {
    res.send("Welcome")
});


app.listen(3000, () => {
    console.log("server started on port 3000")
});