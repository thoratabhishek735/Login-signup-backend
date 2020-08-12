const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SHARED_SECRET} = require('../keys')

router.post('/signup',function(req,res){
    const {name,email,type,password,mobile} = req.body;
    console.log(name,email,type,password,mobile);
    if(!name || !email || !password || !type || !mobile){
        return res.status(422).json({error:"please enter all values"})
    }

    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,13).then(hashedpass=>{
            const user = new User({
                type,name,email,
                password:hashedpass,
                mobile
                
            }).save().then((user)=>{
                res.json({msg:"user saved successfully"})
            }).catch(err=>{console.log(err)})
        })
 
    }).catch(err=>{console.log(err)})
})




router.post('/login',function(req,res){
    const {email,password} = req.body;
    console.log(email,password);
    if(!email || !password ){
        return res.status(422).json({error:"please enter all values"})
    }

    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                console.log("yes")
                const token = jwt.sign({id:savedUser._id},SHARED_SECRET);
                const {name,email,type,password,mobile} = savedUser;
                res.json({token:token,user:{name,email,password,type,mobile}})
            }else{
                return res.json({error:"enter valid details"})
            }
        }).catch(err=>{console.log(err)})
        
 
    })
})




module.exports = router;