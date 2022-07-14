const express=require('express')
const app=express()

const mongoose=require("mongoose")
const cors=require('cors')
const cookieParser=require("cookie-parser")

app.use(express.static('public'))
app.use(cookieParser())

app.use(cors())
// app.use(express.urlencoded({ extended: true }));

const fs=require("fs-extra")
const bodyParser=require('body-parser')
app.use(bodyParser.json())


const login=require('./routes/login')
const register=require('./routes/register')
const users=require('./routes/users')
app.use('/login',login)
app.use('/register',register)
app.use('/users',users)


app.get('/',(req,res)=>{
    console.log('Clicked')
    res.send({word:'Hi'})
})


mongoose.connect("mongodb://localhost/trashclicker",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    ()=>{
        console.log("CONNECTED DB");
    }
);
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log("Connected to database"))

app.listen(8080,()=>{
    console.log('App started at localhost:8080!')
})