const express = require('express');
const app = express();
var bodyParser = require ('body-parser');

// set up global middleware
// Parse incoming requests data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//set and use routers
const userRouter = require('./routes/userRouter.js');
app.use(userRouter);

app.get('/', (req, res) => {
  res
    .status(200)
    .send('This is the api')
    .end();
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;