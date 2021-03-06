const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

// Init middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use(
  '/api/users',
  require('../devconnector/routes/api/users')
);
app.use(
  '/api/auth',
  require('../devconnector/routes/api/auth')
);
app.use(
  '/api/profile',
  require('../devconnector/routes/api/profile')
);
app.use(
  '/api/posts',
  require('../devconnector/routes/api/posts')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
