
const{StatusCodes}=require('http-status-codes');

// custom error handling
const errorHandlerMiddleware = (err, req, res, next) => {
   
    let customError={
        //set default 
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,msg:err.message || 'something went wrong try again later'
    }

//validation error
if(err.name==='ValidationError'){
    // console.log(Object.values(err.errors));
    customError.msg=Object.values(err.errors).map(item=>item.message).join(',');
    customError.statusCode=400
}
//deplication error
if(err.code && err.code===11000){
    customError.msg=`Duplicate value entered for ${Object.keys(err.keyValue)} field,please choose another value`;
    customError.statusCode=400;
}
//cast error for convert from one datatype to another type
if(err.name==='CastError'){
    customError.msg=`No item found with id:${err.value}`;
    customError.statusCode=404
}

return res.status(customError.statusCode).json({msg:customError.msg})
    
}

module.exports=errorHandlerMiddleware;