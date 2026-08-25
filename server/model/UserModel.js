const mongoose = require('mongoose');
const validator   = require('validator');

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

userSchema.pre('save', function(next){
    this.password
});

let schema = mongoose.model('User', userSchema)

module.exports = schema