const express=require('express')
const fs = require('fs-extra')
const router=express.Router()
const bcrypt=require('bcrypt')
const User = require('../model/User')

router.get('/',(req,res)=>{
    res.send({message:'HI'})
})


router.post('/',async(req,res)=>{
    const {username,password}=req.body
    if(username===''||password===''){
        res.json({success:false,message:'Missing fields required to fill!'})
    } else {
        await User.findOne({username:username})
        .then(res1=>{
            console.log(res1)
            if(!res1){
                res.json({success:false,message:'Invalid username or password!'})
            } else {
                bcrypt.compare(password, res1.password, function(err, result) {
                    if(err){
                        console.log(err)
                    } else {
                        if(!result){
                            res.json({success:false,message:'Invalid username or password!2'})
                        } else {
                            res.json({success:true,message:'Login succeed!',id:res1._id})
                        }
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
})

module.exports=router