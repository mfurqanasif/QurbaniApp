const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cowRoutes = require('./routes/cowRoutes');

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', bookingRoutes);
app.use('/api', cowRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
