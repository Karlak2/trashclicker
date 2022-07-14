const express=require('express')
const fs = require('fs-extra')
const router=express.Router()
const bcrypt=require('bcrypt')
const User = require('../model/User')
const registercontrol=require('../middlewares/registercontrol')


router.get('/',async(req,res)=>{
    await User.find()
    .then(resp=>{
        let usernames=[]
        resp.map((el,ind)=>{
            let x={}
            x.username=el.username
            x.id=el._id
            x.email=el.email
            usernames.push(x)
        })
        res.json({success:true,users:usernames})
    })
    .catch(err=>{
        res.json({success:false,message:err})
    })
})

router.get("/:getId",async(req,res)=>{
    let id=req.params.getId
    await User.find({_id:id})
    .then(resp=>{
        let x={}
        x.username=resp[0].username
        x.id=resp[0]._id
        x.email=resp[0].email
        console.log(resp)
        res.send({success:true,users:x})
    })
    .catch(err=>{
        res.send({success:false,message:"User not found!"})
    })
})


router.put('/:putId',registercontrol,async(req,res)=>{
    let id=req.params.putId
    bcrypt.hash(req.body.password, 10,async function(err, hash) {
        if(err){
            console.log('Error in hash')
        } else {
            await User.updateOne({_id:id},{
                email:req.body.email,
                username:req.body.username,
                password:hash
            })
            res.json({success:true,message:'User data updated'})
        }
    });
})

router.delete('/:delId',async(req,res)=>{
    try {
        await User.deleteOne({_id:req.params.delId})
        .then(()=>{
            res.json({success:true})
        })
        .catch(err=>{
            res.json({success:false,message:'Deleting was failed!'})
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports=router