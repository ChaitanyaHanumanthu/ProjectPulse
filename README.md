<h1> Project Pulse </h1>


<h2> Desription </h2>

<p> This product will serve as tracking tool for projects and portfolio for each GDO and overall organisation. </p>


<h2> How to Install the project </h2>
Download the git repository manually or clone it by following command

```
git clone https://github.com/ChaitanyaHanumanthu/ProjectPulse.git
```
or you can use download the ZIP 

run the following command to install each of the modules which required for this project.

```
  npm install
```
and then start the server by using below command

```
  npm start
```
<h2> Configurations </h2>

create ```.env``` folder and add the following details to the ```.env``` file
  
  ```
  PORT = PORT
  DB_NAME = YOUR_DB_NAME (Add your details)
  DB_USER = YOUR_DB_USER
  DB_PASSWORD = YOUR_DB_PASSWORD
  SECRET_KEY = jdhfskjdfl
  EMAIL_SERVICE_PROVIDER = EMAIL_SERVICE_PASSWORD
  EMAIL = YOUR_EMAIL
  EMAIL_PASSWORD = EMAIL_PASSWORD (App Password)
  
  ```
  
  
  Create database named ```projectPulse``` and use it<br>
  We assume that employee table is existing in a database, so create a employee table with (attributes:{empId,empName}) and insert data into employee table
 
<h2> Users Roles </h2>

```
Super admin
Special User - Admin
Gdo Head
Project Manager
Hr manager
```

<h2> ROLES </h2>

### Super Admin Roles

```
get the user details who are registered to this portal
assign / update the role to the registered users
update user details
```

### Admin User roles (Special people)

```
 1.Get all the projects in an organization
 2.Get specific project details (Detailed overview,project concerns, project updates team Composition)
 3.Create a project
 4.Get the resourcing requests
 5.Update the existing project
 6.Delete existing project
```
 
### Gdo roles 
```
 1.Get all projects under him. - projectPortfolio dashboard
 2.Get specific project details (Detailed overview,project concerns, project updates team Composition)
 3.Assigning projects to employees(Creating a team)
 4.Raising Resource requests
 5.Getting concerns
```

### Project manager roles
```
1.Raise project updates 
2.Raise project concerns
3.Get all the updates
4.Get all the last two weeks updates
5. Get all the concerns
4.Get all the project under him
```

