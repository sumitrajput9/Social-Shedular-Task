const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./src/router/socialRouter');
const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/social-media', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
