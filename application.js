var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');


// Securable endpoints: list the endpoints which you want to make securable here
var securableEndpoints = ['months'];

var app = express();

// Enable CORS for all requests
app.use(cors());

/**
 * Base Datasource endpoint for dealing with RESTful datasource requests
 */
app.use('/static_ds', require('./lib/static-datasource.js'));

// You can define custom URL handlers here, like this one:
app.use('/', function(req, res) {
  res.end('Your Cloud App is Running');
});

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
