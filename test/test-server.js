var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var weapon = require('../models/weapons');

var should = chai.should();
var app = server.app;
//var storage = server.storage;

chai.use(chaiHttp);

describe('Weapons', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                
                done();
            });
    });
    
    it('should return specified item on GET/items/id', function(done) {
        chai.request(app)
            .get('/items/2')
            .end(function(err, res) {
                should.equal(err, null);
            
                done();
            });
    });
    
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
         
                done();
            });
    });
    
    it('should edit an item on PUT', function(done) {
        chai.request(app)
            .put('/items/:id')
            .send({'id': 3, 'name': 'Love'})
            .end(function(err, res) {
               should.equal(err, null);
        
               
               done();
            });
    });
    
    it('should delete an item on DELETE', function(done) {
        chai.request(app)
            .delete('/items/:id')
            .send({'id': 4}, {'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);

                done();
            });
    });
    
});