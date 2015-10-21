var express = require('express');
var router = express.Router();

/*
    A RESTful enpoint to load a list of months.

    This static list of months is properly formatted as a Data Source to be used in Forms Apps

    An example of this format is:

    [
        {
            "key": "some_key",
            "value": "some_value"
        }
    ]
*/
router.get('/months', function (request, response) {

    // Here we are loading the static months json file.
    var staticMonths = require('./months.json');

    // And sending it back.
    response.send(staticMonths);
});

module.exports = router;
