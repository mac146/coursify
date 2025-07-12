const express=require('express')
const jwt=require('jsonwebtoken')
require('dotenv').config();

const Jwt_USER_SECRET=process.env.Jwt_USER_SECRET

async function usermiddleware(req,res,next){
    try{
        const token=req.headers.token

        if(!token){
           return res.status(401).json({
                message:"token not provided"
            })
        }
        const decoded=jwt.verify(token,Jwt_USER_SECRET)
            req.userid=decoded.userid
            next();
        
    }catch(e){
        return res.status(403).json({
            message:"something went wrong"
        })
    }
}

module.exports=usermiddleware;