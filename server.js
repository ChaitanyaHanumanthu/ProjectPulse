// importing the express module

const express = require("express");
const app = express();

// importing dotenv

require("dotenv").config();
port = process.env.port; // assigning the port number
app.listen(port, () => console.log(`server initiated at ${port}`));

// Importing router apps
const userApp = require("./routes/user.routes");
const adminApp = require("./routes/admin.routes");

// bodyParser
app.use(express.json());

// importing database connection

const sequelize = require("./databases/db.config");
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection establised");
  })
  .catch((err) => {
    console.log("Error at db connection: ", err);
  });
sequelize.sync();

// importing models from the sequelize
const { User } = require("./models/users.model");
const { Project } = require("./models/project.model");
const { Updates } = require("./models/updates.model");
const { Concerns } = require("./models/concerns.model");


// assosiation
User.Project = User.hasOne(Project, { foreignKey: { name: "GdoId" } });
Project.Updates = Project.hasMany(Updates, {
  foreignKey: { name: "projectId" },
});
Project.Concerns = Project.hasMany(Concerns, {
  foreignKey: { name: "projectId" },
});

// importing models from the sequelize

// UserApi
app.use("/user-api", userApp);

// admin - api
app.use("/admin-api", adminApp);

// invalid path
app.use("*", (req, res) => {
  res.send({ message: "Invalid Path" });
});

// Error handler
app.use((err, req, res, next) => {
  res.send({ Error_message: err.message });
});
