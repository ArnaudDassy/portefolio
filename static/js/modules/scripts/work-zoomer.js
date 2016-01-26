"use strict";

exports.init = function($){
    var currentTag = document.getElementsByClassName('currentTag')[0];
    loadWorks($, currentTag);
    var aLi = document.getElementsByClassName('works__filter')[0].children[0];
    for( var i = -1 ; ++i<aLi.children.length ; ){
        aLi.children[i].addEventListener('click', function(){
            if(this.className == ''){
                loadWorks($, this);
            }
        });
    }
};

function loadWorks($, el){

    var currentTag = document.getElementsByClassName('currentTag')[0];
    currentTag.className = '';

    el.className = 'currentTag';
    var tag = '';
    var tagEl = el.innerHTML.toLowerCase();
    if( tagEl != 'tous' ) tag = tagEl;
    var elWorks = document.getElementsByClassName('works')[0];
    var elWorkContainer = document.getElementsByClassName('works__container')[0];

    elWorks.removeChild(elWorkContainer);

    elWorkContainer = document.createElement('div');
    elWorkContainer.className = 'works__container';

    elWorks.appendChild(elWorkContainer);

    $.ajax({
        url : './works-json?tag='+tag,
        type: 'post',
        dataType: 'json',
        success : function(body){
            var works = body[0];
            var work, work_image, work_infos, img_project, title, link;
            if(works == null) works = [];
            for( var i = -1 ; ++i<works.length ; ){
                work = document.createElement('div');
                work_image = document.createElement('div');
                work_infos = document.createElement('div');
                img_project = document.createElement('img');
                link = document.createElement('a');
                link.href = '../work/' + works[i].id;
                link.title = 'Naviguer vers la page du projet '+works[i].title;
                title = document.createElement('p');
                img_project.src = works[i].img_small_path;
                img_project.alt = works[i].img_alt;
                title.innerHTML = works[i].title;

                work.className = 'works__work_container';
                work_image.className = 'works__work__image';
                work_infos.className = 'works__work__infos';
                title.className = 'works__work__name';

                link.appendChild(img_project);
                work_image.appendChild(link);
                work_infos.appendChild(title);

                work.appendChild(work_image);
                work.appendChild(work_infos);

                elWorkContainer.appendChild(work);
            }

            if(works.length == 0){
                var h3 = document.createElement('h3');
                h3.innerHTML = 'Pas de projet pour le moment :(';
                elWorkContainer.appendChild(h3);
            }

        }
    })
}
