const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  let bearerToken = req.headers.authorization;
  if (bearerToken == undefined) {
    res.send({ message: "Unauthorized user" });
  } else {
    let token = bearerToken.split(" ")[1];
    try {
      let status = jwt.verify(token, process.env.SECRET_KEY);
      next();
      // res.send({ message: "loggedin successfull" });
    } catch (err) {
      res.send({ message: "relogin again..." });
    }
  }
};

module.exports = verifyToken;
