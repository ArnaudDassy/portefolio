"use strict";

module.exports = function( oRequest, oResponse ) {
    oResponse.render( "./works/create.jade", {"location": "Works - Create"} );
};