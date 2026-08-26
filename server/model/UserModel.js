const mongoose = require('mongoose');
const validator   = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required Field']
    },
    emailId:{
        type:String,
        required:[true,'Email ID is required Field'],
        unique:true,
        validate:[validator.isEmail, "Enter Valid EmailId"]
    },
    password:{
        type:String,
        required:[true,'Enter the Password'],
        minLength: [8, "Password should be have atleast 8 Characters"]
    },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpired:Date,
    createAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

let schema = mongoose.model('User', userSchema)

module.exports = schema