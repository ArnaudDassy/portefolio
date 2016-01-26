//var db = require('/../../../db/database-model.js');
var oWork = {
    "id": "",
    "filtre": "",
    "img_path": "",
    "img_alt": "",
    "title": "",
    "description": "",
    "softwares": []
}, body;

var db = require('../../../db/database-model.js');

module.exports = function( oRequest, oResponse ) {

    body                 = oRequest.body;
    oWork.id             = new Date().getTime() + '';
    oWork.filtre         = body.filtre;
    oWork.title          = body.title;
    oWork.description    = body.description;
    oWork.img_alt        = body.img_alt;
    oWork.img_path       = "./img/works/"+ oRequest.files[0].filename ;
    oWork.img_small_path = "./img/works/small-"+ oRequest.files[0].filename ;

    body.photoshop   ? makeSoftware('photoshop')   : null ;
    body.illustrator ? makeSoftware('illustrator') : null ;
    body.premiere    ? makeSoftware('premiere')    : null ;
    body.wordpress   ? makeSoftware('wordpress')   : null ;
    body.nodejs      ? makeSoftware('nodejs')      : null ;
    body.mysql       ? makeSoftware('mysql')       : null ;
    body.php         ? makeSoftware('php')         : null ;
    body.htmlcss     ? makeSoftware('htmlcss')     : null ;
    body.maya        ? makeSoftware('maya')        : null ;

    db.getAll( '', function(error, data){
        console.log(error);
        console.log(data);
        data.push(oWork);
        db.saveJSON( data ,function(error){
            oResponse.redirect('../works');
        } )
    } );

};

function makeSoftware(s){

    var soft = {
        "name": s,
        "path": "./img/logos/"+s+".png"
    };
    oWork.softwares.push(soft);

}