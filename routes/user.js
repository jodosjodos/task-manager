
//routes that hadnle registeration of form
const express=require('express');
const router=express.Router();
const{landing,login,signUp,register}=require('../controllers/user');
router.route('/').get(landing);
router.route('/loginPage').get(login);
router.route('/signUpPage').get(signUp);
router.route('/register').post(register);
module.exports=router;