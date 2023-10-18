const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../env-constants");

module.exports = (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed!",
    });
  }
};
