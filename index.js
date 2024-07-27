const express = require('express');
const path = require('path');
const mongoDB = require('./database');

const app = express();
const port = 5000;

//CORS
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
    // "https://food-way.vercel.app/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './pages/backend-home.html'));
});

app.use(express.json());

app.use('/api', require('./routes/Register'));
app.use('/api', require('./routes/Login'));
app.use('/api', require('./routes/DisplayData'));

mongoDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
