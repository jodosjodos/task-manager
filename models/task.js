const mongoose=require('mongoose');
const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'Register'
    }
});
module.exports=mongoose.model('Task', TaskSchema)