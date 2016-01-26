"use strict";

exports.init = function(sLocation){

    var menuItems = document.getElementsByTagName('header')[0].children[0];

    switch(sLocation){
        case '':
            menuItems.children[0].className += 'active';
            break;
        case 'home':
            menuItems.children[0].className += 'active';
            break;
        case 'about':
            menuItems.children[1].className += 'active';
            break;
        case 'works':
            menuItems.children[2].className += 'active';
            break;
        case 'contact':
            menuItems.children[3].className += 'active';
            break;
    }
};