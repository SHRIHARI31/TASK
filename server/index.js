const express = require("express");
const app = express();
app.use(express.json());
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
app.use('/api', studentRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database synchronization
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});







