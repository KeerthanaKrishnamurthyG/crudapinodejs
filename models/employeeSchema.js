const { text } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const empSchema= new mongoose.Schema({
    ename:{
        type:String,
        required:true

    },
    emailId:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model("empSchema",empSchema)