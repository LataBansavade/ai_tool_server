const { validateData } = require("../utils/authUtils");
const User = require('../models/userModel')
const bcrypt = require("bcryptjs")

const registerController = async(req,res)=>{
        console.log("register api");
        const {name, email,password,username} = req.body;
        console.log(req.body);
        try {
            await  validateData({name, email,username,password})
            await User.emailAndUsernameExist({email,username})
            
            
        } catch (error) {
            return res.send({
                status: 400,
                message: error
            })
        }

        try {
            const userObj = new User({name, email,username, password})
            const userDb = userObj.registerUser()
  
            console.log(userDb);
            
            return res.send({
                status: 201,
                message: "user registered successfully",
                data: userDb
            })
      } catch (error) {
          return res.send({
              status: 400, 
              message: "Internal Server Error",
              error: error
          })
      }
}

const loginController = async(req,res)=>{
   console.log("login api");
   const{loginId , password} = req.body;

   if(!loginId || !password) return res.send({
    status: 400,
    message: "loginId and password are required"
   })

   try {
         const userDb = await User.findUserLoginId({loginId})
         const isMatch = await bcrypt.compare(password, userDb.password)

         if(!isMatch)return res.send({
            status: 400,
            message: "Incorrect password"
         })

         console.log(req.session);
         req.session.isAuth = true;
         req.session.user ={
            userId: userDb._id,
            email : userDb.email,
         }
    
         return res.send({
            status: 200,
            message: "login successfull",
            data: userDb,
        })
   } catch (error) {
        return res.send({
        status: 500,
        message: "Internal Server Error",
        error: error
    })
   }
}

const logoutController =async (req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.send({
            status: 500,
            message: "Internal Server Error",
            error: err
        })
        return res.send({
            status: 200,
            message: "logout successfull"
        })
    })
}
module.exports = {registerController, loginController,logoutController}