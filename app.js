require('dotenv').config();

require('express-async-errors');
const express=require('express');
const app = express();
const hbs=require('hbs');
const cookieParser=require('cookie-parser');
const path=require('path');
const bodyParser=require('body-parser');

//routes hadnlers
const signUpRoute=require('./routes/user');
const loginRoute=require('./routes/login');
const taskRouter=require('./routes/tasks');
//middwares
const {requireAuth}=require('./middleware/authMiddlware')
const notFoundMiddleware=require('./middleware/not-found');
const errorHandleMiddleware=require('./middleware/error-handler')
//connection to db
const connectDB=require('./db/connect');

//static files and view engine
app.set('view engine', 'hbs');
const partials=path.join(__dirname, './views/partials')
hbs.registerPartials(partials)



// 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//routes handling
app.use('/',signUpRoute);

app.use('/login',loginRoute);
app.use('/login',requireAuth,taskRouter);

//erros handling
app.use(errorHandleMiddleware);
app.use(notFoundMiddleware);

//port and listening

const port=process.env.PORT ||3000;
//connection and sart listening
const start=async()=>{
    try {
         await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`app is running on port ${port}`);
        });
        
    } catch (err) {
       console.log(err);
       process.exit(1); 
    }
}
start();













 





 












