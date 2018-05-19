function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Probably Thomas's fault"
    }
  })
}

module.exports = errorHandler;
