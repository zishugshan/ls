const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  pic_url: { type: String, required: true },
  pic_title: { type: String, required: true },
  pic_description: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);
