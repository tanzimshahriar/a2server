# a2server

## Project setup steps


1. Install npm from https://www.npmjs.com/get-npm

2. Clone the git repo by "git clone https://github.com/tanzimshahriar/a2server.git" 

3. Install all dependencies by "npm install" from the app directory

4. OPTION 1: Cloud database: Create database for the server in gcloud
use ServerDatabase;

  ### Create the database instance and database
  ```
  A. Go to console.google.com
  ```
  ```
  B. Create a new project (Note: the application don't need to be deployed on google engine if you run it locally)
  ```
  ```
  C. Go to SQL Create instance and choose mysql. Type a unique instance id and provide a root password. Choose database version MYSQL 5.7. Now create a database named 'serverDatabase'
  ```

  ### Use a MySql tool like MySqlWorkbench to edit the database
  ```
  D. Download and install MySQLWorkbench to connect to the database. Enter username as 'root' and your password you chose in step C. 
  Host name is the Public IP address found in your Google SQL instance overview.
  ```
  ```
  E. Select the database by:
  `use YOUR_DATABASE_NAME;` 
  Now create the following tables using mysqlWorkbench:
  `use YOUR_DATABASE_NAME;
  CREATE TABLE IF NOT EXISTS users (
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (email)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;`
  ```
  ```
  F. Create a .env file in the project home directory and add the following lines in .env file.
  `DB_HOST=publicIPaddress
  DB_DATABASE=serverDatabase
  DB_USER=root
  DB_PASS=password
  INSTANCE_CONNECTION_NAME=instanceConnectionName
  NODE_ENV=production`
  
  VERY IMPORTANT: go to .gitignore and add .env so your database information isn't uploaded to github.

  Now, Go to the Google SQL instance you created and click on overview. 
  change DB_HOST,DB_PASS and INSTANCE_CONNECTION_NAME to required values.
  ```

OR
OPTION 2: Local database: Create local mysql database (NEED TO BE DONE)
```
```
5. Run the server locally by npm start 
```
```
6. Optional: Deploy the application to GCE by `gcloud app deploy`
```
### Run the server locally by
```
npm start
```
