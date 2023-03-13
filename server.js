// importing the express module
const express = require("express");
const app = express();

// importing dotenv
require("dotenv").config();
port = process.env.port; // assigning the port number
app.listen(port, () => console.log(`server initiated at ${port}`));

// Importing router apps
const userApp = require("./routes/user.routes"); //User App
const managerApp = require("./routes/projectManager.routes"); //Manager App
const adminApp = require("./routes/admin.routes"); //admin App
const gdoApp = require("./routes/gdo.routes"); // GDO App
const superAdminApp = require("./routes/superAdmin.routes"); // Super Admin App

// verify token middlewares
const {
  verifyAdminToken,
} = require("./middlewares/adminTokenVerify.middleware"); //admin Token middleware
const {
  verifySuperAdminToken,
} = require("./middlewares/superAadminTokenVerify.middleware"); //super Admin Token middleware
const { verifyGdoToken } = require("./middlewares/gdoTokenVerify.middleware"); // Gdo Token Middleware
const {
  verifyManagerToken,
} = require("./middlewares/managerTokenVerifiy.middleware"); // Manager Token Middleware

// bodyParser
app.use(express.json());

// importing seqelize from database config
const sequelize = require("./databases/db.config");

// checking the database connection
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
const { User } = require("./models/users.model"); //user model
const { Project } = require("./models/project.model"); //project model
const { Updates } = require("./models/updates.model"); // updates model
const { Concerns } = require("./models/concerns.model"); //concerns model
const { Team } = require("./models/teamComposition.model"); //Team Model
const { Resource } = require("./models/raiseResource.model"); //resource model

// assosiation
// assosiation between user and project - one to many relationships
User.Project = User.hasMany(Project, { foreignKey: { name: "GdoId" } });

// assosiation between project and updates - one to many relationship
Project.Updates = Project.hasMany(Updates, {
  foreignKey: { name: "projectId" },
});

// assosiation between project and updates - one to many relationship
Project.Concerns = Project.hasMany(Concerns, {
  foreignKey: { name: "projectId" },
});

// assosiation between user and updates - one to many relationship
User.Updates = User.hasMany(Updates, { foreignKey: { name: "userId" } });

// assosiation between updates and user - belongs to relationship
Updates.User = Updates.belongsTo(User, { foreignKey: { name: "userId" } });

// assosiation between user and concerns - one to many relationship
User.Concerns = User.hasMany(Concerns, {
  foreignKey: { name: "concernRaisedBy" },
});

// assosiation between concerns and user - belongs to  relationship
Concerns.User = Concerns.belongsTo(User, { foreignKey: { name: "userId" } });

// assosiation between team and projects - has many
Project.Team = Project.hasMany(Team, { foreignKey: { name: "projectId" } });

// assosiation between team and projects - has many
Project.Resource = Project.hasMany(Resource, {
  foreignKey: { name: "projectId" },
});

// importing models from the sequelize
app.use("/user-api", userApp); // UserApi
app.use("/super-admin-api", verifySuperAdminToken, superAdminApp); // super admin api
app.use("/admin-api", verifyAdminToken, adminApp); // admin - api
app.use("/gdo-api", verifyGdoToken, gdoApp); // gdo - api
app.use("/manager-api", verifyManagerToken, managerApp); // project - api

// invalid path handler
app.use("*", (req, res) => {
  res.send({ message: "Invalid Path" });
});

// Error handler
app.use((err, req, res, next) => {
  res.send({ Error_message: err.message });
});
