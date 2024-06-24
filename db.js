const mongoose = require('mongoose')
const clc = require('cli-color')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(clc.bgWhite("mongodb connected successfully"));
}).catch(()=>{
    console.log(clc.redBright(err));
})