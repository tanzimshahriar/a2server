const mysql = require('mysql');

module.exports = (req, res, next) => {
  // Database Connection for google sql
  if (process.env.NODE_ENV == "production") {
    let config = {
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE
    }
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    connection = mysql.createConnection(config);
    console.log("Connected to database, using google sql database");
    next();
  } else {
     // local Database
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "shoppingapp",
      password: "12345678"
    });

    connection.connect(function (err) {
      if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return next();
      }
      console.log('Database Connected as thread id: ' + connection.threadId);
      next();
    });
  }
}
