const express=require('express')
const fs = require('fs-extra')
const router=express.Router()

router.get('/',async(req,res)=>{
    const ind=await fs.readFile('../../clickapp/public/game.html','utf-8')
    res.send(ind)
})