const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  description: { type: String, maxLength: 200 },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);