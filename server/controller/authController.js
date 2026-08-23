const userModel = require("../model/UserModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const authMethods = {};

authMethods.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, emailId,password,avatar} = req.body ;

    const user = await userModel.create({
        name,emailId,password,avatar
    });

    res.status(201).json({
        success:true,
        user,
        message:"User Created Successfully"
    })
});

authMethods.getAllUsers = catchAsyncError(async(req,res,next) => {
    const users = await userModel.find();

    res.status(200).json({
        success:true,
        message:`Found ${users.length} Users.`,
        users,
    })
})


module.exports = authMethods;
