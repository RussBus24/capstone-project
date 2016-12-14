var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(validator());

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

var Weapon = require('./models/weapons');
var Franchise = require('./models/franchise');
var Category = require('./models/category');
var TotalWeapon = require('./models/totalweapon');

app.get('/weapon', function(request, response) {
    Weapon.find(function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.get('/franchise', function(request, response) {
    Franchise.find(function(err, franchise) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(franchise);
    });
});

app.get('/category', function(request, response) {
    Category.find(function(err, category) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(category);
    });
});

app.post('/weapon', function(request, response, next) {
    request.checkBody("name", "Please enter a valid weapon name").notEmpty();
    request.checkBody("cost", "Please enter a valid cost number").isInt({min: 1, max: 999});
    request.checkBody("strength", "Please entera valid strength number").isInt({min: 1, max: 999});

    var errors = request.validationErrors();
        if (errors) {
    console.log(errors);
    response.send("Looks like there was an error:" + errors.msg);
    return;
        }

    Weapon.create({
        name: request.body.name,
        cost: request.body.cost,
        strength: request.body.strength
    }, function(err, weapon) {
        if (err) {
            console.log(err);
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.post('/franchise', function(request, response, next) {
    request.checkBody("name", "Please enter a valid franchise name").notEmpty();
    request.checkBody("publisher", "Please enter a valid cost number").notEmpty();

    var errors = request.validationErrors();
        if (errors) {
    console.log(errors);
    response.send("Looks like there was an error:" + errors.msg);
    return;
        }
    
    Franchise.create({
        name: request.body.name,
        publisher: request.body.publisher
    }, function(err, franchise) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(franchise);
    });
});

app.post('/category', function(request, response, next) {
    request.checkBody("name", "Please enter a valid category name").notEmpty();
    request.checkBody("description", "Please enter a description").notEmpty();

    var errors = request.validationErrors();
        if (errors) {
    console.log(errors);
    response.send("Looks like there was an error:" + errors.msg);
    return;
        }
        
    Category.create({
        name: request.body.name,
        description: request.body.description
    }, function(err, category) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(category);
    });
});

app.post('/totalweapon', function(request, response) {
    request.checkBody("weapon", "Invalid weapon").notEmpty();
    request.checkBody("franchise", "Invalid franchise").notEmpty();
    request.checkBody("category", "Invalid category").notEmpty();

    var errors = request.validationErrors();
        if (errors) {
    console.log(errors);
    response.send("Looks like there was an error:" + errors.msg);
    return;
        }
    
    TotalWeapon.create({
        weapon: request.body.weapon,
        franchise: request.body.franchise,
        category: request.body.category
    }, function(err, totalweapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(totalweapon);
    });
});

app.put('/weapon/:name', function(request, response) {
    request.checkParams("name", "Invalid parameter").notEmpty();
    
    var errors = request.validationErrors();
        if (errors) {
    console.log(errors);
    response.send("Looks like there was an error:" + errors.msg);
    return;
        }
    
    Weapon.findOneAndUpdate({name: request.params.name}, {
        name: request.body.name,
        cost: request.body.cost,
        strength: request.body.strength
    }, {new: true}, function(err, weapon) {
        if (err) {
            console.log(err);
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.put('/franchise/:franchise', function(request, response) {
    request.checkParams("franchise", "Invalid parameter").notEmpty();
    
    var errors = request.validationErrors();
        if (errors) {
    console.log(errors);
    response.send("Looks like there was an error:" + errors.msg);
    return;
        }
    
    Franchise.findOneAndUpdate({name: request.params.franchise}, {
        name: request.body.name,
        publisher: request.body.publisher
    }, {new: true}, function(err, franchise) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(franchise);
    });
});

app.delete('/weapon/:name', function(request, response) {
    
    Weapon.remove({
        name: request.params.name
    }, function(err, weapon) {
        if (err) {
            response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.delete('/franchise/:franchise', function(request, response) {
    
    Franchise.remove({
        name: request.params.name
    }, function(err, franchise) {
        if (err) {
            response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(franchise);
    });
});

app.use('*', function(request, response) {
    response.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;