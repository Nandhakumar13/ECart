const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../model/UserModel");

exports.isAuthenticateUser = catchAsyncError(async (req,res,next) => {
    // console.log("=== 01");
    
    const {token} = req.cookies;
    // console.log("=== 02", token);
    if(!token){
        return next(new ErrorHandler("You're Not authenticated to access this url.", 401));
    }
    const deCodedId = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(deCodedId.id);
    next();

})


exports.AuthorizeRole = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} Role -  doesn't have the authorization to access this route`, 423));
        }
        next();
    }
}