var assert = require('assert');
var request = require('supertest');
var proxyquire = require('proxyquire');

var corsMock = function () {
    return function (req, res, next) {

        return next();
    }
};
var mbaasApiStub = {
    mbaasExpress: function () {
        return {
            sys: function () {
                return function (req, res, next) {return next()};
            },
            mbaas: function (req, res, next) {
                return next()
            },
            fhmiddleware: function () {
                console.log('middleware')
                return function (req, res, next) {
                    console.log('middleware inner', req, res, next);
                    return next()
                };
            },
            cloud: function () {
                return function (req, res, next) {return next()};
            },
            errorHandler: function () {
                return function (req, res, next) {return next()};
            }
        }
    },
    '@global': true
}

var mocks = {
    'fh-mbaas-api': mbaasApiStub
};


var app = proxyquire('../../application.js', mocks);


exports['test returned months data'] = function (done) {
  request(app)
  .get('/static_ds/months').expect(200).end(function (err, response) {
    var body = response.body;

    assert(Array.isArray(body), 'response body should be an array');
    assert.equal(body[0].key, '01', 'first key is 01');
    assert.equal(body[0].value, 'January', 'first value is January');
    assert(body[0].selected, 'first value should be selected');
    return done();
  })
};
