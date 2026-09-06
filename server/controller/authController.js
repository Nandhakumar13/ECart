const userModel = require("../model/UserModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/jwt');
const authMethods = {};

authMethods.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, emailId,password,avatar} = req.body || {};

    const user = await userModel.create({
        name,emailId,password,avatar
    });

    let message="";
    if(user){
         message = "User Registered Successfully";
    }
    sendToken(user,201,res,message);

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     success:true,
    //     user,
    //     token,
    //     message:"User Created Successfully",
    // })
});

authMethods.getAllUsers = catchAsyncError(async(req,res,next) => {
    const users = await userModel.find();

    res.status(200).json({
        success:true,
        message:`Found ${users.length} Users.`,
        users,
    })
})


// login method handler

authMethods.loginUser = catchAsyncError(async(req,res,next) =>{
    const {emailId,password} = req.body || {};
    if(!emailId || !password){
        return next(new ErrorHandler("Enter the EmailId or Password", 400));
    }

    const user = await userModel.findOne({emailId}).select('+password');

    if(!user){
        return next(new ErrorHandler("Invalid EmailId. User Not found for the entered emailId", 401));
    }

    if(!(await user.getPassword(password))){
        return next(new ErrorHandler("Invalid Password entered", 401));
    }

    let message="";
    if(user){
         message = "User Logged in Successfully";
    }
    sendToken(user,201,res,message);

})

module.exports = authMethods;
