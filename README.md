# a2server

## Project setup steps
```
1. Install npm from https://www.npmjs.com/get-npm
```
```
2. Clone the git repo by "git clone https://github.com/tanzimshahriar/a2server.git" 
```
```
3. Install all dependencies by "npm install" from the app directory
```
```
4. OPTION 1: Cloud database: Create database for the server in gcloud
use ServerDatabase;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

OR
OPTION 2: Local database: Create local mysql database
```

```
5. Try running the app locally by "npm start" from the app directory
```
```
6. Deploy the app to gcloud using app.yaml
```
### Run the server by
```
npm start
```
