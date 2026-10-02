const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack:err.stack,
      error:err
    });
  }
  else{
    let message = err.message;
    let error =new ErrorHandler(message);


    if(err.name == 'ValidationError'){
        errMsg = Object.values(err.errors).map(val => val.message)
        error = new ErrorHandler(message)
    }

    if(err.name === 'CastError'){
      message = `Resource not found ${err}`
      err.statusCode = 404;
      error = new ErrorHandler(message, 404)
    }

     res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
  }
 
};
