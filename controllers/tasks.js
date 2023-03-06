const Task=require('../models/task');
const jwt=require('jsonwebtoken');
const StatusCodes=require('http-status-codes');
const User=require('../models/user');
const mongoose=require('mongoose');



const getAllTasks=async(req,res)=>{
  
  try {
    const token0 =req.cookies.jwtLogin;
    
    if(token0) {
      const token=token0.split(' ')[1];
     
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
            if(err) {
                console.log(err);
            }else {
                const id=decodedToken.id;
              
                try {
                 
                    const tasks=await Task.find({createdBy:id});
                    const user=await User.findOne({_id:id});
                
                  const userName=user.userName;
                
                  
                      res.status(StatusCodes.OK).json({ tasks,userName });
                     
                } catch (err) {
                    console.log(err);
                }
            }
        })
    }
   
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err})
  }

  
    
}
const getTask=async(req,res)=>{
    try {
      const id0=req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id0)){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'this is is invalid please provide a valid id'})
      }
      const id=mongoose.Types.ObjectId(id0);
        const task = await Task.findById(id)
        if (!task) {
          return res.status(StatusCodes.NOT_FOUND).send('Task not found')
        }
        res.json({ task })
      } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('sever error')
      }
   
}
const createTask=async(req,res)=>{
    try {
        const token0=req.cookies.jwtLogin;
        if(token0){
      const token=token0.split(' ')[1];
       jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
     if(err){
        console.log(err);
           }
      else{
        const id=decodedToken.id;
        const name=req.body.name;
        const createdBy=id;
        try{
            const task=await Task.create({name,createdBy}); 
            res.status(StatusCodes.CREATED).json({task});
          

        }catch(err){
           res.Status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err})
        }
        
       }
     })
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({msg:'not found'})
    }

    } catch (err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
    
    
}
const updateTask=async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'completed']
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    )
    if (!isValidUpdate) {
      return res.status(400).send('Invalid update')
    }
  
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!task) {
        return res.status(404).send('Task not found')
      }
      res.json({ task })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
}
const deleteTask=async(req,res)=>{
    try {
      const id0=req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id0)){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'this is is invalid please provide a valid id'})
      }
      const id=mongoose.Types.ObjectId(id0);
       
        const task=await Task.findOneAndDelete({_id:id});
        if(!task) {
         return res.status(StatusCodes.NOT_FOUND).json({msg:`no id for task ${id}`})
        }
        res.status(StatusCodes.OK).json({msg:`task with id ${id} has been deleted`})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err})
    }
  

}
module.exports={
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}