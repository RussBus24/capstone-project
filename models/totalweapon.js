var mongoose = require('mongoose');

var totalWeaponSchema = new mongoose.Schema({
       weapon: {type: Schema.Types.ObjectId, ref: 'Weapon'},
       franchise: {type: Schema.Types.ObjectId, ref: 'Franchise'}
    });
    
var totalWeapon = mongoose.model('totalWeapon', totalWeaponSchema);

module.exports = totalWeapon;