const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../env-constants");

module.exports = (req, res, next) => {
  try {
    const { token } = req.body;
    const decode = jwt.verify(token, JWT_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed!",
    });
  }
};
