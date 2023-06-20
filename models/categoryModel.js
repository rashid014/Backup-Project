const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
  // Add more properties as per your requirements
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
