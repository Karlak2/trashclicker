const validmail=require('email-validator')
const validpassword=require('password-validator')
const User=require('../model/User')

const pwschewma=new validpassword()
pwschewma.is().min(8)

module.exports=async(req,res,next)=>{
    const {email,name,pw}=req.body
    if(email===''||name===''||pw===''){
        res.json({success:false,message:'Missing fields required to fill!'})
    } else {
        await User.findOne({email:email})
        .then(async res2=>{
            if(res2){
                res.json({success:false,message:'Email registered already'})
            } else {
                if(!validmail.validate(email)){
                    res.json({success:false,message:'Please type a valid email!'})
                } else {
                    await User.findOne({username:name})
                    .then(res3=>{
                        if(res3){
                            res.json({success:false,message:'Username already exist'})
                        } else {
                            if(!pwschewma.validate(pw)){
                                res.json({success:false,message:'Password must be at least 8 character long!'})
                            } else {
                                next()
                            }
                        }
                    })
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}