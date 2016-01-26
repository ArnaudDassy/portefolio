"use strict";

module.exports = function( oRequest, oResponse ) {
    oResponse.render( "works.jade", {"location": "Works"} );
};
