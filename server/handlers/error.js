const errorHandler = (
    res,
    statusCode = 500,
    message = "Internal Server Error"
  ) => {
    console.log("Here");
    return res.status(statusCode).json({
      success: false,
      message,
    });
  };

  module.exports = {
    errorHandler
  }