"use strict";

var $ = require( "jquery"),
    Works = require('./scripts/work-zoomer.js'),
    Work = require('./scripts/work-loader.js'),
    Menu = require('./scripts/menu.js'),
    Contact = require('./scripts/contact.js');

var currentLocation =  document.location.href.split('/');

$( function() {

    console.log("server:started");

    Menu.init(currentLocation[3]);

    if(currentLocation[3] == 'works') Works.init($);

    if(currentLocation[3] == 'work') Work.init($, currentLocation[4]);

    if(currentLocation[3] == 'contact') Contact.init();

} );
