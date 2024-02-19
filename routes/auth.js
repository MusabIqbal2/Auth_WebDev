const express = require('express');
var router = express.Router();
const bcrypt= require('bcrypt');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const e = require('express');

const SecretKey = 'My_Secret_Key';

router.post('/SignUp', async(req,res) => {
    try{
        const { email, password }=req.body;

        if (password.length < 8 ) {
            return res.status(400).json({ msg: 'Password must be at least 8 characters long'});
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
            return res.status(400).json({ msg: 'Password must include at least 1 symbol'});
        }

        let user= await Users.findOne({email})
        if (user) return res.json({msg:'USER ALREADY EXISTS'})

        await Users.create({...req.body, password: await bcrypt.hash(password,5)});

        return res.json({msg:'NEW USER CREATED'})
    }catch(error){
        console.error(e)
    }
});

router.post('/Login', async(req,res) => {
    try{
        const {email, password} = req.body;

        const user= await Users.findOne({email});
        if (!user) return res.json({msg:'USER NOT FOUND'})

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({msg:'PASSWORD IS INCORRECT'})

        const token = jwt.sign({
            email:user.email,
            createdAt: new Date(),
            age:user.age,
            admin:user.admin,
        },SecretKey,{expiresIn: '1d'});

        res.json({
            msg:'LOGGED IN', token
        })


    }catch(error){
        console.error(error)
    }
})

module.exports=router