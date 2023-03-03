//routes that handle tasks features
const express = require('express');
const router=express.Router();
const { getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask}=require('../controllers/tasks');
router.route('/').get( getAllTasks);
router.route('/post').post(createTask);
router.route('/:id').get( getTask);
router.route('/:id').patch(updateTask) ;
router.route('/:id').delete(deleteTask);
module.exports = router;