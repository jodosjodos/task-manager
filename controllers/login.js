const User=require('../models/user');
const StatusCodes=require('http-status-codes');
const {BadRequestError,NotFoundError}=require('../errors');

const path=require('path');

const user = require('../models/user');
const { JsonWebTokenError } = require('jsonwebtoken');
const loginPage=path.join(__dirname,'../views/partials/login.hbs');
const taskManager=path.join(__dirname,'../public/task.html');
const jwt = require('jsonwebtoken');
//Things to  create tokenHandler
const maxAge=90*24*60*60
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:maxAge});
}
const login=async(req,res) => {
    const requestPassword=req.body.password
    const requestEmail=req.body.email;
    const user=await User.findOne({email:requestEmail});
    if(!user) {
        return   res.status(StatusCodes.BAD_REQUEST).render(loginPage,{msg_type:'bad',msg:'invalid credentials'});
    }
    
    const isPassword=await user.comparePassword(requestPassword);
    if(! isPassword){
     return   res.status(StatusCodes.UNAUTHORIZED).render(loginPage,{msg_type:'bad',msg:'invalid credentials'});
      
    }
    const token0=createToken(user._id);
    const token1='Bearer '+'' + token0;
   
            res.cookie('jwtLogin',token1,{httpOnly:true,maxAge:maxAge *1000});
       
    res.sendFile(taskManager);
}
const logOut=async(req,res)=>{
    res.cookie('jwtLogin','',{maxAge:1});
    res.redirect('/');
}

module.exports ={login,logOut}
    
   
    

   
    

    
   

    

   
    
    


    
 
   
