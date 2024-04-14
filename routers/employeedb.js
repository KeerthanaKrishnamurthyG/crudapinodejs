
const express=require('express')

const empSchema=require('../models/employeeSchema')
const emproutes=express.Router()

emproutes.get('/getalldetails',async(req,res)=>{
  
try{
    const getAllempDetails= await empSchema.find()
    res.json(getAllempDetails)
}
catch(err){
    res.status(500).send({data:" Error occured"})
}
})

emproutes.get('/:id', async (req, res) => {
    const getempdetail = await empSchema.findById(req.params.id);
    if (!getempdetail) {
      return res.status(404).send('Id not found');
    }
    res.json(getempdetail);
  });

emproutes.post('/addemployee', async(req, res) => {
    // fetch the data in json format then save in database
   
    const newempdetails =new empSchema({
        ename:req.body.ename,
        emailId:req.body.emailId,
        mobileNumber:req.body.mobileNumber

    })

    try{
        const addnewemployee=await newempdetails.save()
        res.json(addnewemployee)
        console.log(addnewemployee)
        res.status(200).send({
            message:'SUCCESS',
            data:addnewemployee
        })
     
    }
   
    catch(err){
        res.status(500).send({data:" Error occured"})
    }
  });

 
  emproutes.put('/changeempDetails/:id', async(req,res)=>{
    console.log("received")
    try{
        const {id}=req.params
        const updateemp=await empSchema.findByIdAndUpdate(id,req.body)
           if (!updateemp){
              res.status(404).send({
                body:"data not found"
            })
           }
           const currentupdatedempDetail= await empSchema.findById(id)
           console.log(currentupdatedempDetail)
           res.json(currentupdatedempDetail).status(200)
        }
    catch(err){
        res.status(500).send({data:" Error occured"})
    }

  })



  emproutes.delete('/deleteempdata/:id',async(req,res) => {
    try{
        const {id} = req.params
        const deleteempdata= await empSchema.findByIdAndDelete(id)
       
        if(!deleteempdata){
           return  res.status(404).send({
                body:"data not found"
            })}
            console.log("deleted successfully")
        res.json(deleteempdata).status(200)  
    }

catch(err){
    res.status(500).send({data:" Error occured"})
}})


module.exports=emproutes