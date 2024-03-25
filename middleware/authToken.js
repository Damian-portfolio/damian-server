const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ error: "No token provided" });
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authToken;
