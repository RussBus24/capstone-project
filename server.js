var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

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
};

var Weapon = require('./models/weapons');
var Franchise = require('./models/franchise');
var Category = require('./models/category');

app.get('/', function(request, response) {
    Weapon.find(function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.post('/weapon', function(request, response) {
    Weapon.create({
        name: request.body.name,
        cost: request.body.cost,
        strength: request.body.strength,
        franchise: request.body.franchise
    }, function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.post('/franchise', function(request, response) {
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

app.post('/category', function(request, response) {
    Category.create({
        name: request.body.category
    }, function(err, category) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(category);
    });
});

app.put('/weapon/:name', function(request, response) {
    Weapon.update({
        name: request.params.name
    }, function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.put('/weapon/:cost', function(request, response) {
    Weapon.update({
        cost: request.params.cost
    }, function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
    });
});

app.put('/weapon/:strength', function(request, response) {
    Weapon.update({
        cost: request.params.strength
    }, function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapon);
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
    });
});

app.use('*', function(request, response) {
    response.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;