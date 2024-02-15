const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
const {upload}=require('../Middleware/multer')
const { verifyToken } = require('../Middleware/auth')



router.post('/signup',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/updatepicture/:id',verifyToken, upload.single('img'), userController.updatePicture);


module.exports=router