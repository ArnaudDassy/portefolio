"use strict";

module.exports = function( oRequest, oResponse ) {

    oResponse.render( "about.jade", {"location": " About "} );

};
