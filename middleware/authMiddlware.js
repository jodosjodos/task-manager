
//middlware for checking if user have token which show that she or he have logged in
const jwt=require('jsonwebtoken');


const requireAuth=(req,res,next)=>{
 const token0=req.cookies.jwtLogin;
 const token=token0.split(' ')[1];

 //check if token exist
 if(token){
jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
    if(err){
        console.log(err);
        res.redirect('/loginPage')
    }
    else{

     next();
    }
});
 }else{
    res.redirect('/loginPage');
 }
}


module.exports={requireAuth};  