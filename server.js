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
  require('C:\\Users\\peter\\OneDrive\\Documents\\AA - Fake Sem\\devconnector\\config\\routes\\api\\users')
);
app.use(
  '/api/auth',
  require('C:\\Users\\peter\\OneDrive\\Documents\\AA - Fake Sem\\devconnector\\config\\routes\\api\\auth')
);
app.use(
  '/api/profile',
  require('C:\\Users\\peter\\OneDrive\\Documents\\AA - Fake Sem\\devconnector\\config\\routes\\api\\profile')
);
app.use(
  '/api/posts',
  require('C:\\Users\\peter\\OneDrive\\Documents\\AA - Fake Sem\\devconnector\\config\\routes\\api\\posts')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
