const httpStatus = require('http-status');

module.exports = (req, res) => {
  return res.status(httpStatus.OK).json({
      status: true,
      message: httpStatus["200_MESSAGE"]
  });  
};