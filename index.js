const express = require('express');

const dotenv = require('dotenv').config()

const PORT = process.env.port

const app = express();

const mongoose = require("mongoose")

app.use(express.json());

//connect to database
mongose.connect(process.env.port).then(()=>{
    console.log(`connection to database is established`)
}).catch ((err)=>{
    console.log(`unable to connect to the db because ${err}`);
})

const date = new Date
//console.log(date.getFullYear());
//creating a schema
const userModel = new mongoose.Schema({
    name:{type:String,required:[true,'Kindly drop your name']},
    email:{type:String,unique:true,required:[true,'Kindly drop your email'],toLowerCase:true},
    stack:{type:String,},
    dateOfBirth:{type:Number,required:true},
    sex:{type:Number,required:true,enum:['male','female']},
    age:{type:Number}
    
},{timeStamps:true})

const myModel = mongoose.model('firstclass',userModel)

app.get('/',(req,res)=>{
    res.status(200).json('Welcome to MongoDB')
});
 
 app.post('/createuser',async(req,res)=>{
    try {
        let{name,email,stack,sex,dateOfBirth,}=req.body
        let fullName = name.split('')
        console.log(fullName);
        let removedSpace = fullName.filter((space)=> space !== '')
         console.log(removedSpace);
        let firstLetter = removedSpace[0].slice(0,1).toUpperCase()
        let remaining = removedSpace[0].slice(1).toLowerCase()
        let totalName = firstLetter+remaining

        // let lastName = removedSpace[removedSpace.length-1]
        // console.log(lastName);
        let firstLetter2 = removedSpace[1].slice(0,1).toUpperCase()
        let remaining2 = removedSpace[1].slice(1).toLowerCase()
        let total2 = firstLetter2+remaining2
        
        const data={name:totalName+''+total2,email,stack,dateOfBirth,age:date.getFullYear()-dateOfBirth} = req.body
        const createuser = await myModel.create(data)
        res.status(200).json({
            'message':`new user creted`,
            createuser
        })
    } catch (err) {
        res.status(400).json(err.message)
    }
 })

 //get all
 app.get('/getallstudents',async(req,res)=>{
    try {
        const allstudents = await myModel.find()
        res.status(200).json({message:`Kindly find below ${allstudents.length} students`,allstudents})
    } catch (err) {
        res.status(400).json(err.message)
    }
 })
 
//get one by id
app.get('/getone/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let founduser = await myModel.findById(id)
        res.status(200).json({info:`Kindly find the requested user below`,founduser})
    } catch (err) {
        res.status(500).json(err,message)
    }
}) 

//get one by email
app.get('/getones/:email',async(req,rea)=>{
    try{
        let email = req.params.email
        console.log(email);
        let founduser = await mymodel.findone({email})
        res.status(200).json({info:`Kindly find the requested user below`,founduser})
        } catch (err) {
            res.status(500).json(err,message)
    }
})

//update
app.put('/updateuser/:id',async(req,res)=>{
    try {
        let id = req.params.id
        console.log(req.body);
        let update = await mymodel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({message:`user update a success`,uodate})
    } catch (err) {
        res.status(500).json(err,message)
    }
})

 //delete
 app.delete('/deleteuser/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let deleteuser = await mymodel.findByIdAndDelete(id,req.body)
        res.status(200).json({message:`user with ${id} deleted`,deleteuser})
    } catch (err) {
        res.status(500).json(err,message)
    }
    })
 app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`); 
 })