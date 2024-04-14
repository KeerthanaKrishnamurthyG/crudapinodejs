const express=require('express')

// nav route 
const employeeroutes=require('../apicrud/routers/employeedb')


// db Part
const mongoose=require('mongoose')
url='mongodb://localhost:27017/employeeDb'
mongoose.connect(url,{useNewUrlParser:true})
const connectiondiscover=mongoose.connection
connectiondiscover.on('open',()=> {
    console.log("connection created ")
})

// app part
const app=express()
app.listen(3090,()=>{
    console.log("server Listening to the port ")
})
const bodyParser=require('body-parser')
app.use(express.json())
app.use("/employee", employeeroutes)







