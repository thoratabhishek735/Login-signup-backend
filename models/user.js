const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
    
})

mongoose.model("User",userSchema);