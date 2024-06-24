const express = require('express')
require('dotenv').config();
const clc = require('cli-color')
const session = require("express-session")
const mongoDbSession = require('connect-mongodb-session')(session)
const cors = require('cors');


//file imports

const db = require('./db');
const authRouter = require('./routers/authRouter');
const aiRouter = require('./routers/aiRouter');


const app = express()
const PORT = process.env.PORT

// session setup
const store = new mongoDbSession({
    uri: process.env.MONGO_URI,
    collection:'sessions'
})

// middleware

app.use(cors({
    origin: 'https://ai-tool-client.vercel.app', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

//CORS Middleware
const corsMiddleware = (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://aifusion-project-final.vercel.app');
    res.setHeader('Access-Control-Allow-Origin', 'https://ai-tool-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};
// Apply CORS Middleware globally
app.use(corsMiddleware);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
}))

app.use('/auth',authRouter)
app.use('/ai',aiRouter)

app.get('/home' ,(req,res)=>{
    res.send('Welcome to the home page')
} )


app.listen( PORT ,()=>{
    console.log(clc.greenBright(`Server is runing on PORT : ${PORT}`));
})