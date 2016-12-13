var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var totalWeaponSchema = new mongoose.Schema({
       weapon: {type: Schema.Types.ObjectId, ref: 'Weapon'},
       franchise: {type: Schema.Types.ObjectId, ref: 'Franchise'},
       category: {type: Schema.Types.ObjectId, ref: 'Category'}
    });
    
var totalWeapon = mongoose.model('totalWeapon', totalWeaponSchema);

module.exports = totalWeapon;