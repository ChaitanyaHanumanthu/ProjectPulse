// importing the express module
const express = require("express");
const app = express();

// importing dotenv
require("dotenv").config();
port = process.env.port; // assigning the port number
app.listen(port, () => console.log(`server initiated at ${port}`));

// Importing router apps
const userApp = require("./routes/user.routes");
const managerApp = require("./routes/projectManager.routes");
const adminApp = require("./routes/admin.routes");
const gdoApp = require("./routes/gdo.routes");
const superAdminApp = require("./routes/superAdmin.routes");

const {
  verifyAdminToken,
} = require("./middlewares/adminTokenVerify.middleware");

const {
  verifySuperAdminToken,
} = require("./middlewares/superAadminTokenVerify.middleware");

const { verifyGdoToken } = require("./middlewares/gdoTokenVerify.middleware");

const {
  verifyManagerToken,
} = require("./middlewares/managerTokenVerifiy.middleware");

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

User.Updates = User.hasMany(Updates, { foreignKey: { name: "userId" } });
Updates.User = Updates.belongsTo(User, { foreignKey: { name: "userId" } });

User.Concerns = User.hasMany(Concerns, { foreignKey: { name: "userId" } });
Concerns.User = Concerns.belongsTo(User, { foreignKey: { name: "userId" } });

// importing models from the sequelize

// UserApi
app.use("/user-api", userApp);

// super admin api
app.use("/super-admin-api", verifySuperAdminToken, superAdminApp);

// admin - api
app.use("/admin-api", verifyAdminToken, adminApp);

// gdo - api
app.use("/gdo-api", verifyGdoToken, gdoApp);

// project - api
app.use("/project-api", verifyManagerToken, managerApp);

// invalid path
app.use("*", (req, res) => {
  res.send({ message: "Invalid Path" });
});

// Error handler
app.use((err, req, res, next) => {
  res.send({ Error_message: err.message });
});
