const sendToken = async (model, status, res, msg) => {
  const token = model.getJwtToken();

  // cookie settings

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.status(status).cookie("token", token, cookieOptions).json({
    model,
    msg,
    token,
    msg,
  });
};

module.exports = sendToken;
