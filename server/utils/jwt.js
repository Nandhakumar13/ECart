const sendToken = async(model,status,res,msg) => {
    const token = model.getJwtToken();
     res.status(status).json({
        model,
        msg,
        token,
        msg
    })
}

module.exports = sendToken;