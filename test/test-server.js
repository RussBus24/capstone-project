var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var Weapon = require('../models/weapons');
var Franchise = require('../models/franchise');
var Category = require('../models/category');

var should = chai.should();
var app = server.app;
//var storage = server.storage;

chai.use(chaiHttp);

describe('Weapons', function() {
    before(function(done) {
        server.runServer(function(err) {
            if (err) {
                console.log(err);
            }
            Weapon.create({name: 'Ragnarok',
                        cost: 100,
                        strength: 100}, function() {
            });
            Franchise.create({name: 'Final_Fantasy',
                        publisher: 'SquareEnix'}, function() {
            }); 
            Category.create({name: 'Sword',
                        description: 'Very pointy object'}, function() {
                done();    
            });
        });
    });

    after(function(done) {
        Weapon.remove(function() {
        });
        Franchise.remove(function() {
        });
        Category.remove(function() {
           done(); 
        });
    });
    
    
    it('should list weapon on GET', function(done) {
        chai.request(app)
            .get('/weapon')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('cost');
                res.body[0].should.have.property('strength');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].cost.should.be.a('number');
                res.body[0].strength.should.be.a('number');
                res.body[0].name.should.equal('Ragnarok');
                res.body[0].cost.should.equal(100);
                res.body[0].strength.should.equal(100);
                done();
            });
    });
    
    it('should list franchise on GET', function(done) {
        chai.request(app)
            .get('/franchise')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('publisher');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].publisher.should.be.a('string');
                res.body[0].name.should.equal('Final_Fantasy');
                res.body[0].publisher.should.equal('SquareEnix');
                done();
            });
    });
    
    it('should add a weapon on POST', function(done) {
        chai.request(app)
            .post('/weapon')
            .send({'name': 'Durendal',
                  'cost': 200,
                  'strength': 200})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('cost');
                res.body.should.have.property('strength');
                res.body._id.should.be.a('string');
                res.body.name.should.be.a('string');
                res.body.cost.should.be.a('number');
                res.body.strength.should.be.a('number');
                res.body.name.should.equal('Durendal');
                res.body.cost.should.equal(200);
                res.body.strength.should.equal(200);
                done();
            });
    });
    
    it('should add a franchise on POST', function(done) {
        chai.request(app)
            .post('/franchise')
            .send({'name': 'Breath_of_Fire',
                  'publisher': 'Capcom'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('publisher');
                res.body._id.should.be.a('string');
                res.body.name.should.be.a('string');
                res.body.publisher.should.be.a('string');
                res.body.name.should.equal('Breath_of_Fire');
                res.body.publisher.should.equal('Capcom');
                done();
            });
    });
    
    it('should add a category on POST', function(done) {
        chai.request(app)
            .post('/category')
            .send({'name': 'Bow_and_Arrow',
                  'describe': 'For hunting'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('describe');
                res.body._id.should.be.a('string');
                res.body.name.should.be.a('string');
                res.body.description.should.be.a('string');
                
                done();
            });
    });
    
    it('should add a total weapon on POST', function(done) {
        chai.request(app).get('/weapon').end(function(err, res) {
            var weaponId = res.body[0]._id;
            chai.request(app).get('/franchise').end(function(err, res) {
                var franchiseId = res.body[0]._id;
                chai.request(app).get('/category').end(function(err, res) {
                    var categoryId = res.body[0]._id;
                    chai.request(app)
            .post('/totalweapon')
            .send({'weapon': weaponId,
                  'franchise': franchiseId,
                  'category' : categoryId
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('weapon');
                res.body.should.have.property('franchise');
                res.body.should.have.property('category');
                res.body._id.should.be.a('string');
                res.body.weapon.should.be.a('string');
                res.body.franchise.should.be.a('string');
                res.body.category.should.be.a('string');
                
                done();
            });
                });
            });
        });
    });
    
    it('should edit an item on PUT', function(done) {
        chai.request(app)
            .put('/weapon/Ragnarok')
            .send({'name': 'Great_Sword', 'cost': '500', 'strength': '500'})
            .end(function(err, res) {
               should.equal(err, null);
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('name');
               res.body.should.have.property('cost');
               res.body.should.have.property('strength');
               res.body._id.should.be.a('string');
               res.body.name.should.be.a('string');
               res.body.cost.should.be.a('number');
               res.body.strength.should.be.a('number');
               done();
            });
    });
    
    it('should edit a franchise on PUT', function(done) {
        chai.request(app)
            .put('/franchise/Final_Fantasy')
            .send({'name': 'Suikoden', 'publisher': 'Konami'})
            .end(function(err, res) {
               should.equal(err, null);
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('name');
               res.body.should.have.property('publisher');
               res.body._id.should.be.a('string');
               res.body.name.should.be.a('string');
               res.body.publisher.should.be.a('string');
               done();
            });
    });
    
    it('should delete a weapon on DELETE', function(done) {
        chai.request(app)
            .delete('/weapon/:name')
            .send({'name': 'Durendal'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    
    it('should delete a franchise on DELETE', function(done) {
        chai.request(app)
            .delete('/franchise/:franchise')
            .send({'name': 'Breath_of_Fire'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});