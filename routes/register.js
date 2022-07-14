const express=require('express')
const router=express.Router()
const fs=require('fs-extra')
const bcrypt=require('bcrypt')

const User=require('../model/User')
const registercontrol=require('../middlewares/registercontrol')

router.use(express.static('public'))

router.get('/',(req,res)=>{
    res.send({message:'HI'})
})

router.post('/',registercontrol,async(req,res)=>{
    const {email,username,password} =req.body
    try {
        bcrypt.hash(password, 10,async function(err, hash) {
            if(err){
                console.log('Error in hash')
            } else {
                let newUser=new User({
                    email:email,
                    username:username,
                    password:hash,
                })
                await newUser.save()
                res.json({success:true,message:'User registered'})
            }
        });
    } catch (error) {
        console.log('Error in login.js: ',error)
    }
})

module.exports=router