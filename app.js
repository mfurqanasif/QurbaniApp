const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cowRoutes = require('./routes/cowRoutes');
const cors = require('cors');

app.use(express.json());
//app.use(cors());


app.use(cors({
    origin: '*',  // You can restrict this to specific domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token','ngrok-skip-browser-warning']
}));
// Routes
app.use('/api/users', userRoutes);
app.use('/api', bookingRoutes);
app.use('/api', cowRoutes);
// Start the server
const PORT = process.env.PORT ||3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/*
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cowRoutes = require('./routes/cowRoutes');
const cors = require('cors');

app.use(express.json());

// Allow CORS from the proxy server's domain
const corsOptions = {
  origin: 'https://main.d2ch5vr4hryrit.amplifyapp.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api', bookingRoutes);
app.use('/api', cowRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
