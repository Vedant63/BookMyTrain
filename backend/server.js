require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trains', require('./routes/trainRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.listen(process.env.PORT || 5000, () => 

    console.log(`Server running on port ${process.env.PORT || 5000}`)
);
