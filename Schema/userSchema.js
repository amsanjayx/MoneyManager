const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{type:String, requried:true},
    email:{type:String, requried:true},
    mobile:{type:Number, requried:true},
    password:{type:String, requried:true},
    cpassword:{type:String, requried:true},
    balance:{type:Number, requried:false, default:0},
    income:{type:Number, requried:false, default:0},
    expense:{type:Number, requried:false, default:0},
    date: {type:Date, default:Date.now},
    Transactions: [{Trans:{type:String, required:true}, amount:{type:Number, required:true}}],
    tokens:[{token:{type:String, requried:true}}]
})

//passwrod hashing

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

//token generation
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

//store the transactions
userSchema.methods.updateData = async function (Trans, amount) {
    try{
        this.Transactions = this.Transactions.concat({Trans, amount});
        if(amount<0){
            this.expense=parseInt(this.expense)+Math.abs(parseInt(amount));
            this.balance=parseInt(this.balance)-Math.abs(parseInt(amount));
        }
        else{
            this.income=parseInt(this.income)+parseInt(amount);
            this.balance=parseInt(this.balance)+parseInt(amount);
        }
        await this.save();
        return this.Transactions;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model("USER",userSchema);

module.exports=User;