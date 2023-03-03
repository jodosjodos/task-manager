const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const {isEmail}=require('validator');
const registerSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'please provide username'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'please provide email address'],

      validate:[isEmail,'please provide a valid email'],
      unique:true,
      lowercase:true
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minlength:[6,'password must be at least 6 characters']

    },
    confirmPassword:{
        type:String,
        required:[true,'please provide confirm password'],
        validator:{function(v){
            return v=== this.password
        },message:"confirm password must match password"}
        
        
    }
},{timestamps:true});
registerSchema.pre('save',async function(){
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    this.confirmPassword=await bcrypt.hash(this.confirmPassword,salt);
})

 //verify password
 registerSchema.methods.comparePassword = async function(candiatePassword){
    isMatch=await bcrypt.compare(candiatePassword,this.password);
    return isMatch;
}

module.exports =mongoose.model('Register',registerSchema);

