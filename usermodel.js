const mongoose=require("mongoose");

let userSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true,

    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
   
    Password:{
        type:String,
        required:true,
        
    },
},{timestamps:true});

module.exports =new mongoose.model("User",userSchema);