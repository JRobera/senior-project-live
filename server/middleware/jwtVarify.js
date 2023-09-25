const jwt = require("jsonwebtoken");

// Varify users access token
const varifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  // console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403).json("Time out");
    req.user = decoded;
    next();
  });
};

module.exports = varifyJWT;
