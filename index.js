const express = require('express');
const mongoDB = require('./database'); 

const app = express();
const port = 5000;

//CORS
app.use(
  (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }
)

app.get('/', (req, res) => { 
  res.send("Backend server is running!");
});

app.use(express.json());

app.use('/api', require('./routes/Register'));

mongoDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});