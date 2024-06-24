const userSchema = require("../schemas/userSchema")
const bcrypt = require("bcryptjs")

const User = class{
    // username;
    // name;
    // email;
    // password;    

constructor({username,name,email,password}){
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    registerUser(){
        return new Promise(async(resolve, reject) =>{
             const hashedPassword = await bcrypt.hash(this.password, Number(process.env.SALT));

            const userObj = new userSchema({
                name : this.name,
                email : this.email,
                password : hashedPassword,
                username : this.username
            })

            try {
                 const userDb = await userObj.save()
                 resolve(userDb)
            } catch (error) {
                reject(error)
            }
        })
    }

    // check username or email is alredy available in DB
    static emailAndUsernameExist({email,username}){
        return new Promise(async(resolve, reject)=>{
            try {
                const userDb = await userSchema.findOne({$or:[{email},{username}]
                })
                // console.log("userdb in register >>>>>" , userDb);
                if(userDb && email === userDb.email) reject ("Email already exists")
                if(userDb && username === userDb.username) reject ("username already exists")

                resolve(userDb)
            } catch (error) {
                // console.log("hiii");
                reject(error)
            }
        })  
    }
    
        // function for login 
    static findUserLoginId({loginId}){
        return new Promise(async(resolve, reject)=>{
            try {
               const userDb = await userSchema.findOne({
                    $or:[{email:loginId},{username:loginId}]
                }).select("+password")

                if(!userDb) return reject("User not Found, Please Register")
                resolve(userDb)
            } catch (error) {
                reject(error)
            }
           
        })
    }
}
module.exports = User;