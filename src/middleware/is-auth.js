const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (!token) {
    return res
      .status(404)
      .json({ message: "Access denied - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "here is secret");
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(404).json({ message: "Invalid token provided" });
  }
};
