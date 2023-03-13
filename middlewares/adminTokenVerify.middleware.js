// Importing the json web token
const jwt = require("jsonwebtoken");

// importing dotenv file
require("dotenv").config();

// here is the function to verify the token
exports.verifyAdminToken = (req, res, next) => {
  // getting the token from the request header
  let bearerToken = req.headers.authorization;
  // checking weather there is a tokoen or not
  if (bearerToken == undefined) {
    res.send({ message: "Unauthorized user" });
  } else {
    // splittin the token to get the access
    let token = bearerToken.split(" ")[1];
    try {
      // verifying the role
      let status = jwt.verify(token, process.env.SECRET_KEY);
      if (status.role === "admin") {
        next();
        // if role didn't match
      } else {
        res.send({ message: "Unauthorized role access" });
      }
      // res.send({ message: "loggedin successfull" });
    } catch (err) {
      // if token is expired
      res.send({ message: "relogin again..." });
    }
  }
};
