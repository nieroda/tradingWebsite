const jwt = require('jsonwebtoken')

exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "SHITTYSECRETKEY", (err, decoded) => {
      if (decoded) return next()

      return next({
        status: 401,
        message: "You Must Login First"
      })
    })
  } catch (e) {
    return next({
      status: 401,
      message: "You Must Login First"
    })
  }
}

exports.userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, "SHITTYSECRETKEY", (err, decoded) => {
      if (decoded && decoded.steamid === req.params.id) return next()
      return next({
        status: 401,
        message: "Unauthorized"
      })
    })
  } catch (e) {
    return next({
      status: 401,
      message: "Unauthorized"
    })
  }
}
