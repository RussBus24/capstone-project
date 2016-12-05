var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost/weapons', function(err, db) {
    if (err) {
        console.error(err);
        db.close();
        return;
    }
    
    console.log('Connected to MongoDB database. Welcome!');
    
    var collection = db.collection('weapons');
    
    var create = function(name, franchise, cost, strength) {
        var weapon = {
            name: name,
            franchise: franchise,
            cost: cost,
            strength: strength
        };
        
        collection.insert(weapon, function(err, result) {
            if (err) {
                console.error('Could not create new entry for ', weapon);
                db.close();
                return;
            }
            console.log('Created new entry: ', weapon);
            db.close();
        });
    };
    
    var read = function(name) {
        var query = {
            name: name
        };
        
        collection.findOne(query, function(err, weapon) {
            if (!weapon || err) {
                console.error('Could not read entry for', name);
                db.close();
                return;
            }
            console.log('Reading entry ', weapon.name);
            console.log('Franchise: ', weapon.franchise);
            console.log('Cost: ', weapon.cost);
            console.log('Strength: ', weapon.strength);
            db.close();
        });
    };
    
    var update = function(name, franchise, cost, strength) {
        var query = {
            name: name
        };
        
        var update = {
            $set: {franchise: franchise, cost: cost, strength: strength}
        };
        
        collection.findAndModify(query, null, update, function(err, result) {
            var weapon = result.value;
            if (!weapon || err) {
                console.error('Could not update entry', name);
                db.close();
                return;
            }
            console.log('Updated entry ', weapon.name);
            db.close();
        });
    };
    
    var del = function(name) {
        var query = {
            name: name
        };
        
        collection.findAndRemove(query, function(err, result) {
            var weapon = result.value;
            if (!weapon || err) {
                console.error('Could not delete entry', name);
                db.close();
                return;
            }
            console.log('Deleted entry', weapon.name);
            db.close();
        });
    };
    
    var main = function() {
        if (process.argv == create) {
            console.log('Creating new entry...');
            create(process.argv[3], process.argv[4], process.argv[5]);
        }
        else if (process.argv == read) {
            console.log('Reading database...');
            read(process.argv[3]);
        }
        else if (process.argv == update) {
            console.log('Updating database entry...');
            update(process.argv[3]);
        }
        else if (process.argv == del) {
            console.log('Deleting database entry...');
            del(process.argv[3]);
        }
        else {
            console.error('Invalid command. Please try again.');
            db.close();
        }
    };
    
    main();
    
});