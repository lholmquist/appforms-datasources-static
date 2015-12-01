# Feedhenry Sample Service Using Hard Coded Data for Datasources

This is a sample RESTful service to load a list of **months** that is properly formatted as a Data Source.

The endpoint can be found at `/static_ds/months`

An example of the Data Sources format is below:

You can also choose which item is to be selected by default by setting the "selected" property to true or false.


    [
        {
            "key": "some_key",
            "value": "some_value",
            "selected": false
        },
        {
            "key": "other_key",
            "value": "other_key",
            "selected": true
        }
    ]

