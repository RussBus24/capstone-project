var mongoose = require('mongoose');

var franchiseSchema = new mongoose.Schema({
       name: {type: String, unique: true},
       publisher: String
    });
    
var Franchise = mongoose.model('Franchise', franchiseSchema);

module.exports = Franchise;