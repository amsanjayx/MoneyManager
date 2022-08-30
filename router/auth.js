const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../DB/conn");
const User = require("../Schema/userSchema");
const authenticate = require("../middleware/authenticate")




router.post('/register', async (req,res)=>{

    const {name, email, mobile, password, cpassword} = req.body;

    if(!name){
        return res.send({error:"Please fill name properly"});
    }
    else if(!email){
        return res.send({error:"Please fill email properly"});
    }
    else if(!mobile){
        return res.send({error:"Please fill mobile properly"});
    }
    else if(!password){
        return res.send({error:"Please fill password properly"});
    }
    else if(!cpassword){
        return res.send({error:"Please fill cpassword properly"});
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.send({error:"Email already exists"}); 
        }
        else if(password != cpassword){
            return res.send({error:"Password not matching"}); 
        }
        else{
            const user = new User({name, email, mobile, password, cpassword});

             //password hashing


            await user.save();

            res.status(201).json({message: "Succesfully registered"});
        }
    }
    catch(err){
        console.log(err);
    }
});

//login route

router.post("/signin", async (req,res)=>{

    const {email,password} = req.body;

    if(!email || !password){
         return res.sendStatus(400).send({error:"Please fill the data"});
    }
        try{
            let token;
    
            const userLogin = await User.findOne({email:email});
            console.log(userLogin);
            if(userLogin){
                 console.log(userLogin);
    
                const isMatch = await bcrypt.compare(password,userLogin.password);
    
                token = await userLogin.generateAuthToken(); 
    
                res.cookie("jwtoken",token,{
                    expires: new Date(Date.now()+300000),
                    httpOnly:true
                });
    
                if(isMatch){
                    return res.send({message: "User signin successfully"});
                }
                else{
                    return res.send({error:"Wrong email or password"});
                }   
            }
            else{
                 return res.send({error:"Invalid Credentials"});
            }
        }
        catch(err){
            console.log(err);
        }
});
  
//track page
router.get('/track', authenticate,(req,res)=>{
    res.send(req.rootUser);
    //console.log(`This is the cookie ${req.cookies.jwtoken}`);
});

//update
router.post("/update", authenticate, async (req,res) =>{
    try{
        const {Trans, amount} = req.body;
        if(!amount || !Trans){
            console.log("Error in update");
            return res.json({error: "Please fill properly"});
        }
        const userContact = await User.findOne({ _id: req.userID });
        if(userContact){
            const userUpdate = await userContact.updateData(Trans, amount);
            await userContact.save();
            res.status(201).json({message:"Transaction added succesfully"});
        }
    }
    catch(err){
        console.log(err);
    }
})

//logout page
router.get('/logout', (req,res)=>{
    res.clearCookie("jwtoken", {path:"/"})
    console.log("Logout Page");
    res.status(200).send("User Logout");
});

module.exports=router;