var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
       name: {type: String, unique: true},
       description: String
    });
    
var Category = mongoose.model('Category', categorySchema);

module.exports = Category;