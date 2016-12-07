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
    Weapon.find(function(err, weapons) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
        response.json(weapons);
    });
});

app.post('/weapons/:name', function(request, response) {
    Weapon.create({
        name: request.body.name
    }, function(err, weapon) {
        if (err) {
            return response.status(500).json({
                message: 'A server error occured'
            });
        }
    });
});

app.delete('/weapons/:name', function(request, response) {
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