"use strict";

var db = require('../../../db/database-model.js'), tag;

module.exports = function( oRequest, oResponse ){
    if(oRequest.query.tag == '') tag = '';
    else{
        tag = {
            "filtre": oRequest.query.tag
        }
    }
    db.getAll( tag, function(error, data){
        oResponse.send([data, error]);
    });
};
