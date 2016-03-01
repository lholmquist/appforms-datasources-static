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
            mbaas: function () {
                return function (req, res, next) {
                    return next()
                };
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
    'fh-mbaas-api': mbaasApiStub,
    'cors': corsMock
};


var app = proxyquire('../../application.js', mocks);


exports['test returned months data'] = function (done) {
  request(app)
  .get('/static_ds/months', function (err, response) {
    console.log(err, response);
    return done();
  })
};
