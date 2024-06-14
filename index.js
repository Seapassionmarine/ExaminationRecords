const express = require('express')
const PORT = 7777
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

//connect to mongose
mongoose.connect("mongodb+srv://anthonyeji25:OvkixczEJy7gcch3@cluster0.mq7rtqe.mongodb.net/").then(()=>{

console.log('connection to database established');


app.listen(PORT,()=>{
    console.log(`port established successfully on ${PORT}`);

})

}).catch ((err)=>{
    console.log(`unable to connect to the db because ${err}`);
})

app.get("/",(req,res)=>{
    res.status(200).json('Welcome to our Backend API')
})

const date = new Date

const scoreSchema = new mongoose.Schema({
firstName:{type:String,required:[true,"kindly fill your first name"]},
lastName:{type:String,required:[true,"kindly fill your last name"]},
dateOfBirth:{type:String,required:[true,"date of birth required"]},
age:{type:Number},
sex:{type:String,enum:["male","female"]},
state:{type:String,required:[true,"kindly fiil in your state"]},
subjects:{type:Array,required:[true,"kindly fill in your subjects"]},
scores:{type:Object,required:[true,"kindly fill in your scores"]},
total:{type:Number},
isPassed:{type:Boolean, default:function(){if(this.total<200){
    return false
}else{
    return true
}}}
},{timestamps:true})

const scoreModel = mongoose.model("Post UTME scores",scoreSchema) 

//crete first user
app.post("/createuser",async(req,res)=>{
    try {
        const{firstName,lastName,dateOfBirth,sex,state,subjects,scores} = req.body
    if(!(subjects.includes(object.keys(scores)[0]) && subjects.includes(object.keys(scores)[1]) && subjects.includes(object.keys(scores)[2]) && subjects.includes(object.keys(scores)[3]))){
        return res.status(400).json("scores column doesn't match with the subject provided")
    }else{
        const data = {firstName,lastName,sex,dateOfBirth,state,subjects,age:date.getFullYear()-dateOfBirth,scores,total:Object.values(scores).reduce((a,b)=>{
        return a+b}),
    }
    if(data.age<18){return res.status(400).json('You are eligible to register for this exam')}
    const newData = await scoreModel.create(data)
    res.status(201).json({message:`new user created`,newData})
    }} catch (err) {
        res.status(500).json(err.message)
    }
})

//get all
app.get('/getallstudents',async(req,res)=>{
    try {
        const allstudents = await scoreModel.find(req.body)
        res.status(200).json({message:`below are all ${allstudents.length} in the database`,allstudents})
    } catch (err) {
        res.status(500).json(err.message)
    }
 })
 

app.get('/geotne/:id',async(req,res)=>{
    try {
        let status = req.params.id
        let getOne = await scoreModel.findById(id)
        res.status(200).json({info:`Kindly find the requested user below`,getOne})
    } catch (err) {
        res.status(500).json(err,message)
    }
}) 

app.get('/:status',async(req,res)=>{
    try {
        let status = req.params.status.toLowerCase()==='true'
        const getPass = await scoreModel.find({isPassed:status})
        if (status==true) {
            res.status(200).json({
                message:`kindly find below the ${get.pass.length} passed students`,
                data:getPass
            })
        } else {
            res.status(200).json({
                message:`kindly find below the ${getPass.length} failed students`
            })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
})


//update user
app.put('/updateuser/:id',async(req,res)=>{
    try {
        const userId = req.params.id
        let{yb,subjects,scores} = req.body
        let data = {
            birthYear:yb,
            age:date.getFullYear() - yb,
            subjects,
            scores, 
            total:Object.values(scores).reduce((a,b)=>{
                return a+b
            }),
                
            }
           if(data.total < 200){
            data.isPassed = false
           }else{
            data.isPassed = true
           }
           //data.total < 200 ? isPassed = false : isPassed = true
           if(!(subjects.includes(object.keys(scores)[0]) && subjects.includes(object.keys(scores)[1]) && subjects.includes(object.keys(scores)[2]) && subjects.includes(object.keys(scores)[3]))){
            return res.status(400).json("scores column doesn't match with the subject provided")

        }else{
            const updateuser = await scoreModel.findByIdAndUpdate(userId,data,{new:true})
            res.status(200).json({message:updateuser.firstName + 'information has been successfully update',data})
        }
        await scoreModel.findByIdAndUpdate(userId,{})

    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.put('/updateinfo',async(req,res)=>{
    try{
        const{firstName,lastName,state,sex} = req.body
        let firstLetter = firstName.charAt(0).toUpperCase()
        let remainingChar = firstName.slice(1).toLowercase()
         let allTogether = firstletter.concat(remainingChar)

         let firstLetter2 = lastName.charAt(0).toUppercase()
         let remainingChar2 = lastName.slice(1).toLowercase()
         let allTogether2 = firstletter2.concat(remainingChar2)

         let firstLetter3 = state.charAt(0).toUppercase()
         let remainingChar3 = state.slice(1).toLowercase()
         let allTogether3 = firstletter3.concat(remainingChar3)

         const userInfo  = {
            firstName:allTogether,
            lastName:allTogether2,
            state:allTogether3,
            sex
         }
         console.log(userInfo);
          if(!mongoose.Types.objected.isvalid(req.params.id)){
            return res.status(400).json(`user with id:${req.params.id}not found`)
          }

         if(userInfo.sex !== 'male' && userInfo.sex !== 'female'){
            return res.status(400).json('sex can either be male or female')
         }
         let updateuserInfo = await scoreModel.findByIdAndUpdate(req.params.id.userInfo,{new:true})
         res.status(200).json({
            message:`${updateuserInfo.firstName} information updated`
         })
         
    } catch (err) {
      res.status(500).json(err.message)
    }
})

app.get('/:status',async(req,res)=>{
    try {
        let status = req.params.status.toLowerCase()==='true'
        const getPass = await scoreModel.find({isPassed:status})
        if(status===true){
            res.status(200).json({message:`kindly find below the ${getPass.length} passed students,data:getPass`})
        }else{
            res.status(200).json({message:`kindly find below the ${getPass.length} failed students,data:getPass`})
        }
    } catch (err) {
      res.status(500).json(err.message)  
    }
})


























