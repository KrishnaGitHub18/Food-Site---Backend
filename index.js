const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
const mongoDB = require('./database');

const app = express();
const port = 5000;

// CORS
app.use(cors()); // Use the cors middleware

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
