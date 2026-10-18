require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/campaigns', require('./routes/campaigns'));

// 👇 SERVE THE REACT FRONTEND 👇
// This tells Express to serve the static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route: if a user refreshes on /admin or /campaign/:id, send them to React
app.get('*', (req, res) => {
  // Only do this if the request is not for an API route
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
});

// Connect DB and start server
mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('❌ Mongo error:', err.message));