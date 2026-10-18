require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/campaigns', require('./routes/campaigns'));
app.get('/', (req, res) => res.json({ ok: true }));

// Updated to use MONGODB_URI to match your .env file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected (Cloud Atlas)');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on http://localhost:${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('❌ Mongo error:', err.message));