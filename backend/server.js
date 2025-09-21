const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const path = require('path');

const server = express();

server.use(express.json());
server.use(cors())

// Routes
server.use('/auth', authRoutes);
server.use('/report', reportRoutes);
server.use("/reports", express.static(path.join(__dirname, "reports")));

// Default route
server.get('/', (req, res) => {
  res.send('Assessment Management System Backend Running');
});

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
