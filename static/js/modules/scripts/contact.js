"use strict";

exports.init = function(){

    var aInputs = document.getElementsByClassName('contact__input'), i, currentEl = null, oldEl;

    for( i = -1 ; ++i < aInputs.length ; ){
        aInputs[i].children[1].addEventListener('blur', function(){
            checkEmpty(this);
        });
        aInputs[i].children[1].addEventListener('focus', function(){
            openIt(this);
        });
    }

    for( i = -1 ; ++i < aInputs.length ; ){
        aInputs[i].children[2].addEventListener('click', function(){
            open(this);
        })
    }

    function checkEmpty(el){
        if( el.value != ''){
            if(el.className != 'active'){
                el.className = 'active';
            }
        }
        else{
            el.className = '';
            setTimeout(function(){
                el.parentNode.children[0].attributes.for.nodeValue = el.attributes.name.nodeValue;
            }, 500);
        }
    }
    function openIt(el){
        if(currentEl == null){
            currentEl = el;
            oldEl = currentEl;
        }
        else{
            oldEl = currentEl;
            currentEl = el;
        }
        el.parentNode.children[0].attributes.for.nodeValue = 'null';
    }
    function open(el){
        el.parentNode.children[1].focus();
    }

    document.getElementById('send').addEventListener('click', function(e){
        checkMail(this, e);
    });

    function checkMail(input, oEvent){
        var errors = [], msgError;
        //Check value length
        for( i = -1 ; ++i<aInputs.length ; ){
            if(aInputs[i].children[1].value == ''){ // si le champ est vide
                if(aInputs[i].children.length == 4){ // si le champ a déjà un message d'erreur
                    aInputs[i].removeChild(aInputs[i].children[3]);
                }
                msgError = document.createElement('p');
                msgError.innerHTML = 'Ce champ ne peut être vide';
                aInputs[i].appendChild(msgError);
                errors[i] = false;
            }
            else{ // Si le champ n'est pas vide
                if( i == 1 ){ // Si le champ est l'email
                    if(!validateEmail(aInputs[i].children[1].value)){ // Si l'email n'est pas valide
                        if(aInputs[i].children.length == 4){
                            aInputs[i].removeChild(aInputs[i].children[3]); // On supprime le message précédant et on créé un nouveau
                        }
                        msgError = document.createElement('p');
                        msgError.innerHTML = 'Il semblerait que l\'adresse mail fournie soit invalide';
                        aInputs[i].appendChild(msgError);
                        errors[i] = false;
                    }else{ // Si l'email est valide
                        if(aInputs[i].children.length == 4){
                            aInputs[i].removeChild(aInputs[i].children[3]);
                            errors[i] = true;
                        }
                    }
                }
                if( i == 3){ // Si le champ est le message
                    if(aInputs[i].children[1].value.length < 75){
                        if (aInputs[i].children.length == 4) {
                            aInputs[i].removeChild(aInputs[i].children[3]);
                        }
                        msgError = document.createElement('p');
                        msgError.innerHTML = 'Il semblerait que votre message soit trop court (75 caractères min.)';
                        aInputs[i].appendChild(msgError);
                        errors[i] = false;
                    }else{
                        if (aInputs[i].children.length == 4) {
                            aInputs[i].removeChild(aInputs[i].children[3]);
                            errors[i] = true;
                        }
                    }
                }
                if( i == 0 || i == 2 ){ // Si le champ est le nom ou l'objet
                    if(aInputs[i].children.length == 4){
                        aInputs[i].removeChild(aInputs[i].children[3]);
                        errors[i] = true;
                    }
                }
            }
        }

        var hasErrors = 0;

        for( i = -1 ; ++i < 4 ; ){
            if(errors[i] === false) hasErrors++;
        }

        //Check the useless anti bot input
        if(document.getElementById('useless').value != '') hasErrors++;

        //Check errors
        if(hasErrors == 0){
            input.type = 'submit';
            input.checked = true;
        }

    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
};