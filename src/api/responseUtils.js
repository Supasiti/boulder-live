// get success response
const getSuccessResponse = (content) =>  { 
  return {
    status: 'success',
    body: content,
  };
}

// get fail response
const getFailResponse = (message) =>  { 
  return {
    status: 'fail',
    message: message
  };
}


module.exports = {
  getFailResponse,
  getSuccessResponse
}