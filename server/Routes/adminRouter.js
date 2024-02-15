const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { verifyToken } = require('../Middleware/auth');




router.get('/getuser',verifyToken,adminController.getUser);
router.get('/getuser/:id',verifyToken, adminController.getSingleUser);
router.post('/admin',  adminController.adminLogin);
router.post('/adduser',verifyToken, adminController.addUser);
router.put('/updateuser/:id',verifyToken, adminController.updateUser);
router.delete('/delete/:id',verifyToken, adminController.deleteUser);
router.post('/searchuser',verifyToken, adminController.searchUser);

module.exports = router;
