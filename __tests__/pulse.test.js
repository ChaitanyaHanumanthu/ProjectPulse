// //impot supertest module
// const request = require("supertest");

// //import express app
// const app = require("../server");

// //ADMIN User
// // login;
// test("should return the token", async () => {
//   // act
//   const res = await request(app).post("/user-api/login").send({
//     email: "varun.sample@westagilelabs.com",
//     password: "Varun@123",
//   });
//   // assert
//   expect(res.body).toHaveProperty("payload");
// });

// // get all projects
// test("should get all projects", async () => {
//   const res = await request(app)
//     .get("/admin-api/projects")
//     .set(
//       "authorization",
//       "bearer " +
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IlNhc2hpLnNhbXBsZUB3ZXN0YWdpbGVsYWJzLmNvbSIsImlhdCI6MTY3ODk3MTU3MywiZXhwIjoxNjc5ODM1NTczfQ.oMmSVMxh4_lEc4aLiHNigQAW2hbbYk7IzynWKcXiXgk"
//     );
//   expect(res.body).toHaveProperty("message");
//   expect(res.statusCode).toBe(200);
// });

// // add new project
// test("should create new project", async () => {
//   const res = await request(app)
//     .post("/admin-api/project")
//     .set(
//       "authorization",
//       "bearer " +
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IlNhc2hpLnNhbXBsZUB3ZXN0YWdpbGVsYWJzLmNvbSIsImlhdCI6MTY3ODk3MTU3MywiZXhwIjoxNjc5ODM1NTczfQ.oMmSVMxh4_lEc4aLiHNigQAW2hbbYk7IzynWKcXiXgk"
//     )
//     .send({
//       GdoId: 201,
//       projectId: 11,
//       projectName: "test",
//       client: "test",
//       clientAccountManager: "test",
//       statusOfProject: "completed",
//       startDate: "2023-03-10",
//       endDate: "2023-03-13",
//       projectFitnessIndicator: "Green",
//       domainOfProject: "Node",
//       typeOfProject: "Development",
//       teamSize: 1,
//       projectManager_id: 73,
//       hrManager_id: 53,
//     });
//   expect(res.statusCode).toBe(200);
// });

// // gdo test cases

// test("should get projects under him/her", async () => {
//   // act
//   let res = await request(app)
//     .get("gdo/201/projectPortfolioDashboard")
//     .set(
//       "Authorization",
//       "bearer " +
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ2RvIiwiZW1haWwiOiJTYW5kZWVwLnNhbXBsZUB3ZXN0YWdpbGVsYWJzLmNvbSIsImlhdCI6MTY3ODk3MjY4NSwiZXhwIjoxNjc5ODM2Njg1fQ.QxJU_x3wOqXspBMVyGcOVnqefTo9ueGa9xVrGtYVyc0"
//     );

//   // assertion
//   expect(res.status).toBe(200);
// });



