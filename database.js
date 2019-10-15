const mysql = require('mysql');

module.exports = (req, res, next) => {
  // Database Connection for google sql
  if (process.env.DATABASE_TYPE == 'google' && process.env.NODE_ENV == "production") {
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
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASS
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
