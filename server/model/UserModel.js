const mongoose = require('mongoose');
const validator   = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required Field']
    },
    emailId:{
        type:String,
        required:[true,'Email ID is required Field'],
        unique:true,
        validate:[validator.isEmail, "Enter Valid EmailId"],
        select:false
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

userSchema.methods.getPassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetToke  = function(){
    const token = crypto.randomBytes(20).toString('hex');
     this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    this.resetPasswordTokenExpired = Date.now() + 30 * 60 * 1000;

    return token;


}

let schema = mongoose.model('User', userSchema)

module.exports = schema