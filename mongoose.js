var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', function() {
   var weaponSchema = mongoose.Schema({
       name: {type: String, unique: true},
       franchise: String,
       cost: Number,
       strength: Number
    });

    var Weapon = mongoose.model('Weapon', weaponSchema);
    
var create = function(name, franchise, cost, strength) {
    var weapon = {
        name: name,
        franchise: franchise,
        cost: cost,
        strength: strength
    };
    Weapon.create(weapon, function(err, weapon) {
        if (err || !weapon) {
            console.error("Could not create weapon", name);
            mongoose.disconnect();
            return;
        }
        console.log("Created weapon", weapon.name);
        mongoose.disconnect();
    });
};

var read = function(name) {
    Weapon.findOne({name: name}, function(err, weapon) {
        if (err || !weapon) {
            console.error("Could not read weapon", name);
            mongoose.disconnect();
            return;
        }
        console.log("Read weapon", weapon.name);
        console.log("Franchise:", weapon.franchise);
        console.log("Cost:", weapon.cost);
        console.log("Strength:", weapon.strength);
        mongoose.disconnect();
    });
};

var update = function(name, franchise, cost, strength) {
    Weapon.findOneAndUpdate({name: name}, {franchise: franchise}, {cost: cost}, {strength: strength}, function(err, weapon) {
        if (err || !weapon) {
            console.error("Could not update weapon", name);
            mongoose.disconnect();
            return;
        }
        console.log("Updated snippet", weapon.name);
        mongoose.disconnect();
    });
};

var del = function(name, content) {
    Weapon.findOneAndRemove({name: name}, function(err, weapon) {
        if (err || !weapon) {
            console.error("Could not delete weapon", name);
            mongoose.disconnect();
            return;
        }
        console.log("Deleted weapon", weapon.name);
        mongoose.disconnect();
    });
};

var main = function() {
        if (process.argv[2] == 'create') {
            create(process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
        }
        else if (process.argv[2] == 'read') {
            read(process.argv[3]);
        }
        else if (process.argv[2] == 'update') {
            update(process.argv[3], process.argv[4]);
        }
        else if (process.argv[2] == 'delete') {
            del(process.argv[3]);
        }
        else {
            console.error('Command not recognized');
            mongoose.disconnect();
        }

    };

    main();

});