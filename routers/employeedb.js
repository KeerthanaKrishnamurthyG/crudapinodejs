
const express=require('express')

const empSchema=require('../models/employeeSchema')
const emproutes=express.Router()
//  current date and time function 
function getCurrentDateAndTime(){
    const moment = require('moment');

// Create a moment object with the current date and time
const currentMoment = moment();

// Format the date and time
const formattedDateTime = currentMoment.format('YYYY-MM-DD HH:mm:ss');

return formattedDateTime;

}
function checkString(stringVal){
    // validating String values
    if(typeof stringVal === "string"){
      return true
    } 
    else{
      return false
    }
  }
  function checkValidateEmailId(emailId){
    // validate EmailId
    
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId);
   return isValidEmail
  }
function checkValidateMobileNumber(mobileNumber){
//    validating value contains number or not 
let  numberType=false
if (typeof mobileNumber === 'number') {
   numberType=true
}



let  stringValue = String(mobileNumber)
let  hasTenDigits = stringValue.length === 10
 console.log(numberType + " " + hasTenDigits)

if (numberType===false |  hasTenDigits===false){
    return false
}
else{
    return true
}



}
function validate(ename,emailId,mobileNumber){
//    validating data 
    let enameValidate=checkString(ename)
    let emailIdValidate=checkValidateEmailId(emailId)
    let mobileNumberValidate=checkValidateMobileNumber(mobileNumber)

if(enameValidate && emailIdValidate  && mobileNumberValidate){
       console.log("validated Ename "+ ename + "validated EmailId "+ emailId + "validated mobileNumber " + mobileNumber)
       return [true,""]
}
else{
    let errormessage='An error occurred. please enter validate' 
    if (!enameValidate){
        errormessage+= ' '+ 'Ename'
    }
   if(!emailIdValidate){
        errormessage+= ' ' + 'EmailId'
    }
   if (!mobileNumberValidate){
        errormessage+=' '+ 'MobileNumber'
    }
    console.log(errormessage)

    return [false,errormessage]


  
}
}







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
    try{
    const getempdetail = await empSchema.findById(req.params.id);
    if (!getempdetail) {
      return res.status(404).send('Id not found');
    }
    res.json(getempdetail);
}
catch(err){ res.status(500).send({data:" Error occured"})}
 } );



emproutes.post('/addemployee', async(req, res) => {
    // fetch the data in json format then save in database
    // api name , timing , req data print , validate print ,saved data print 
   console.log("req_body " + " " + req.body)
   console.log("/addemployee api hit at" + getCurrentDateAndTime() )
   console.log("requested data " + req.body.ename + " " + req.body.emailId +" " + req.body.mobileNumber)
   let [validateVal,message]= validate(req.body.ename,req.body.emailId,req.body.mobileNumber)
  if (validateVal){

    const newempdetails =new empSchema({
        ename:req.body.ename,
        emailId:req.body.emailId,
        mobileNumber:req.body.mobileNumber
    
    })

    try{
        const addnewemployee=await newempdetails.save()
        // res.json(addnewemployee).status(200)
        console.log(addnewemployee)
        res.status(200).send({
            message:'SUCCESS',
            data:addnewemployee
        })
        console.log("data saved in DB" + addnewemployee)
     
    }
   
    catch(err){
        console.log("error occurred data not saved in  DB")
        res.status(500).send({data:" Error occured"})
    }
}
else{
    res.send({
        data:message
    }).status(400)
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

// delete  http://localhost:3090/employee/deleteempdata/id
// put http://localhost:3090/employee/changeempDetails/:id
// post http://localhost:3090/employee/addemployee
// get  http://localhost:3090/employee/id
// get  http://localhost:3090/employee/getalldetails
// {
//     "ename":"kalai.k",
//     "mobileNumber":1234,
//     "emailId":"kalai@gmail.com"
// }
module.exports=emproutes
