const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/routes');
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/todos';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);


mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
