var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(express.static('public'));


app.listen(process.env.PORT || 8080);