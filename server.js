// server.js
const express = require('express');
const index = require('./routes/index');

const PORT = process.env.PORT || 5000;

const app = express();

// Load routes
app.use('/', index);
app.use(express.json);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

