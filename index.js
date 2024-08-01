
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./Routes/Dataupload');

const app = express();
const PORT = process.env.PORT || 8080; 
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api', uploadRoutes);

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});  