const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifySuperAdminToken = (req, res, next) => {
  let bearerToken = req.headers.authorization;
  if (bearerToken == undefined) {
    res.send({ message: "Unauthorized user" });
  } else {
    let token = bearerToken.split(" ")[1];
    try {
      let status = jwt.verify(token, process.env.SECRET_KEY);
      if (status.role == "superadmin") {
        next();
      } else {
        res.send({ message: "Unauthorized role access" });
      }
      // res.send({ message: "loggedin successfull" });
    } catch (err) {
      res.send({ message: "relogin again..." });
    }
  }
};
