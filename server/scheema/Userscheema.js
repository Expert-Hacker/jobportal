let express=require('express');
let mongoose=require('mongoose');

let Userscheema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    preflocation1:{
        type:String
    },
    preflocation2:{
        type:String 
    },
    preflocation3:{
        type:String
    },
    filename:{
        type:String,
        default:""
    },
    path:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

let Pariusers=mongoose.model("Pariusers",Userscheema)

module.exports=Pariusers