const express=require('express')
const jwt=require('jsonwebtoken')
   const Jwt_ADMIN_SECRET=process.env.Jwt_ADMIN_SECRET


async function adminmiddleware(req,res,next){
    try{
        const token=req.headers.token

        if(!token){
           return res.status(401).json({
                message:"token not provided"
            })
        }
        const decoded=jwt.verify(token,Jwt_ADMIN_SECRET)
            req.adminid=decoded.id
            next();
        
    }catch(e){
        return res.status(403).json({
            message:"something went wrong"
        })
    }
}

module.exports=adminmiddleware;