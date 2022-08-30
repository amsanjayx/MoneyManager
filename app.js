const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
require("./DB/conn");
const cookieParser = require("cookie-parser");
//const User = require("./Schema/userSchema");
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//link the router files
app.use(require("./router/auth"));

const PORT=process.env.PORT || 3000;


app.get('/register',(req,res)=>{
    res.send("Hello register from the server");
});

app.get('/signin',(req,res)=>{
    res.send("Hello login from the server");
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));
}


app.listen(PORT,()=>{console.log(`Server is running at port ${PORT}`)});
