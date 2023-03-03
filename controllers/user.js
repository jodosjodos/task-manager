const path = require('path');

const {StatusCodes}=require('http-status-codes');
const {BadRequestError,UnauthenticatedError}=require('../errors')
const User=require('../models/user');
const landingFile=path.join(__dirname,'../views/partials/landing.hbs');

const loginPage=path.join(__dirname,'../views/partials/login.hbs');
const signUpPage=path.join(__dirname,'../views/partials/sign-up.hbs');
const jwt=require('jsonwebtoken')
const landing=async(req,res)=>{
    res.render(landingFile);
}
const login=async(req,res)=>{
    res.render(loginPage);
}
const signUp=async(req,res)=>{
    res.render(signUpPage);
}
//Things to  create tokenHandler
const maxAge=90*24*60*60
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:maxAge});
}



//register conttoller
const register=async(req,res)=>{
    try {
    const {userName,email,password,confirmPassword} = req.body;
    
        //check if all fiels are filled
   if(!userName &&!email && !password && !confirmPassword){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:'All fields are required'});
   }
   
    // Check if password and confirmPassword are the same
    else if (password !== confirmPassword) {
     return res.status(StatusCodes.BAD_REQUEST).render(signUpPage,{msg_type:'bad',msg:'password does not match please provide match password'})
   }
   
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
      if (existingUser ) {
      return  res.status(StatusCodes.BAD_REQUEST).render(signUpPage,{msg_type:'bad',msg:'User with this email already exists'});
    }
    else{
const user=await User.create({userName,email,password,confirmPassword});            
            const token=createToken(user._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge *1000});
            res.status(StatusCodes.CREATED).render(loginPage);
    }
} catch (err) {
    const error=err.message;
    const response=error.split(':')[2];
   
    res.status(StatusCodes.BAD_REQUEST).render(signUpPage,{msg_type:'bad',msg:response});
 
}
}
module.exports ={

landing,login,signUp,register
}

        
            
        
      
            
            

        

   
    



  