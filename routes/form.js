const Users = require("../models/user");
const Forms = require("../models/form");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

const SecretKey = 'My_Secret_Key';

router.post('/GetByName', async(req,res) => {
    try{
        const form = await Forms.findOne({formName: req.body.formName})
        if (!form) return res.json({msg: "FORM NOT FOUND"});
        res.json({msg:"FORM FOUND", data: form});
    }catch(e){
        console.error(error)
    }
})

router.post('/GetByNameWithUser', async(req,res) =>{
    try{
        const form = await Forms.findOne({formName:req.body.formName}).populate("user")
        if (!form) return res.json({msg: "FORM NOT FOUND"});
        res.json({msg:"FORM FOUND", data: form});

    }catch(error){
        console.error(error)
    }
})

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})


router.post('/CreateForm', async(req,res) => {
    try{
        const user = await Users.findOne({email: req.user.email})
        if (!user) return res.json({msg:'USER NOT FOUND'})
        await Forms.create({...req.body, user:user._id})
        res.json({ msg: "FORM CREATED" })
    }catch(error){
        console.error(error)
    }
})

router.post("/UpdateUserAge", async(req,res) => {
    try{
        const user = await Users.findOne({email: req.body.email})
        if (!user) return res.json({msg:"USER NOT FOUND"})
        await user.updateOne({age: req.body.age})
        res.json({msg:"AGE UPDATED"})
    }catch(error){ 
    console.error(error)
    }
})

router.post("/UpdateFormMCQ", async(req,res) => {
    try{
        const form = await Forms.findOne({formName: req.body.formName})
        if (!form) return res.json({msg:"FORM NOT FOUND"})
        await form.updateOne({MCQ:req.body.MCQ})
        res.json({msg:"MCQ UPDATED"})
    }catch(error){ 
    console.error(error)
    }
})

router.post("/DeleteUserByEmail", async(req,res) => {
    try{
        const user = await Users.findOne({email: req.body.email})
        if (!user) return res.json({msg:"USER NOT FOUND"})
        await user.deleteOne({email: req.body.email})
        res.json({msg:"USER DELETED"})
    }catch(error){ 
    console.error(error)
    }
})

router.post("/DeleteFormByName", async(req,res) => {
    try{
        const form = await Forms.findOne({formName: req.body.formName})
        if (!form) return res.json({msg:"FORM NOT FOUND"})
        await Forms.deleteOne({formName: req.body.formName})
        res.json({msg:"FORM DELETED"})
    }catch(error){ 
    console.error(error)
    }
})


module.exports = router