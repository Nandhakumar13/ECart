const userModel = require("../model/UserModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/jwt');
const authMethods = {};

const sendMail = require('../utils/mail');
const crypto = require('crypto');

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


authMethods.logOut = catchAsyncError(async(req,res,next) => {
    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly:true
    }).status(200)
    .json({
        message:"User Logged out Successfully"
    })
})

authMethods.forgotPassword = catchAsyncError(async(req,res,next) =>{

    const user = await userModel.findOne({emailId : req.body.emailId}).select('+emailId');

    if(!user){
        return next(new ErrorHandler('User Not Found',404));
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave:false});

    const redirectUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset link has follows \n\n ${redirectUrl} \n\n if you haven't requested this email, then ignore it.`;
   
    try{
        await sendMail({
            email:user.emailId,
            subject: "ECart Password Recovery",
            message 
        })

        return res.status(200).json({
            success : true,
            message : `Email Sent to ${user.emailId} for resetting the password`
        })

    }catch(err){
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpired = undefined;
            await user.save({validateBeforeSave:false});
            return next(new ErrorHandler(err.message, 500));
    }

})

authMethods.resetPassword = catchAsyncError(async (req,res,next)=> {
      
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const data = await userModel.findOne({resetPasswordToken, resetPasswordTokenExpired:{
            $gt: Date.now()
        }});

        if(!data){
            return next(new ErrorHandler('Password reset token is expired or in valid'));
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler('Password not match with confirm password and entered password'));
        }

        data.password = req.body.password;
        data.resetPasswordToken = undefined;
        data.resetPasswordTokenExpired = undefined;

        await data.save({validateBeforeSave : false});

        sendToken(data,201,res);


    })

module.exports = authMethods;
