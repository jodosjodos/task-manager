//this is login routes
const express=require('express');
const router=express.Router();
const {login,logOut}=require('../controllers/login');



router.route('/loginPage').get(login);
router.route('/').post(login);
router.route('/logout').get(logOut);
module.exports=router;