const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const { email, password, userId } = req.body;

  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(404).json({ message: "Please Login" });
  }
  const token = auth.split(" ")[1];

  jwt.verify(token, process.env.secrettoken, function (err, decoded) {
    if (err) {
      res.json({ status: "Please Login First" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = {authentication}