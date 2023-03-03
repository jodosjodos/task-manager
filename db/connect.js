//connection to db
const mongoose=require('mongoose');
mongoose.set('strictQuery', false);

const connectDB=async(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    .then(()=>console.log('successfully connected to db'))
         .catch((err)=>{
            console.log('database connection failed.existing now...');
            console.log(err);
            process.exit(1);
        })

}
module.exports=connectDB;
