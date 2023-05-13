const express = require ('express')
const router = express.Router()
const userControls=require('../../server/controller/user-controller')
const session = require('../../server/middleware/usersession')


const adminController = require('../../server/controller/admin-controller')
const { isLogged, notLogged } = require('../../server/middleware/usersession')








router.get('/login',session.notLogged,  userControls.getLogin)
router.get('/otp',session.notLogged,userControls.getOtp)
router.get('/error',userControls.getError)
router.get('/register',session.notLogged,userControls.getRegister)
router.get('/',session.notLogged, userControls.getLandingpage)
router.get('/home' ,session.isLogged, userControls.getHomepage)


router.get('/register/resend',userControls.resendOtp)




router.get('/logout',userControls.getUserlogout)


router.post('/register',session.notLogged, userControls.saveUser)
router.post('/otp',session.notLogged, userControls.addUser)
router.post('/login', userControls.redirectHomepage)




// router.all('*',userControls.getError)



module.exports=router