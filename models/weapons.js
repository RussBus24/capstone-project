var mongoose = require('mongoose');


var weaponSchema = new mongoose.Schema({
       name: {type: String, unique: true},
       franchise: {type: mongoose.Schema.Types.ObjectId, ref: "Franchise"},
       cost: Number,
       strength: Number
    });
    
var Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = Weapon;