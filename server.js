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
  require('/Users/Peter/Desktop/devconnector/config/routes/api/users')
);
app.use(
  '/api/auth',
  require('/Users/Peter/Desktop/devconnector/config/routes/api/auth')
);
app.use(
  '/api/profile',
  require('/Users/Peter/Desktop/devconnector/config/routes/api/profile')
);
app.use(
  '/api/posts',
  require('/Users/Peter/Desktop/devconnector/config/routes/api/posts')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
