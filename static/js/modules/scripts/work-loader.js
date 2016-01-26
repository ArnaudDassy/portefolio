"use strict";
exports.init = function($, id){
    var url = '../work-json/'+id;
    $.ajax({
        url : url,
        type: 'post',
        dataType: 'json',
        success : function(body){

            var works = body[0];

            var elWorkContainer = document.getElementsByClassName('work')[0];

            var work, work_image, work_infos, work_logo, img_project, description, title, logo, blackOne, blackTwo;

            work = document.createElement('div');
            work_image = document.createElement('div');
            work_infos = document.createElement('div');
            work_logo = document.createElement('div');
            blackOne = document.createElement('div');
            blackTwo = document.createElement('div');
            img_project = document.createElement('img');
            description = document.createElement('p');
            title = document.createElement('p');
            img_project.src = '.' + works.img_path;
            img_project.alt = '.' + works.img_alt;
            description.innerHTML = works.description;
            title.innerHTML = works.title;

            work.className = 'work__container';
            work_image.className = 'work__image';
            work_infos.className = 'work__infos';
            title.className = 'work__name';
            description.className = 'work__description';
            work_logo.className = 'work__tools_logo';
            blackOne.className = 'black black__one';
            blackTwo.className = 'black black__two';

            for( var y = -1 ; ++y<works.softwares.length ; ){
                logo = document.createElement('img');
                logo.src = '.' + works.softwares[y].path;
                logo.alt = works.softwares[y].name;
                work_logo.appendChild(logo);
            }

            work_image.appendChild(blackTwo);
            work_image.appendChild(img_project);
            work_image.appendChild(blackOne);

            work_infos.appendChild(title);
            work_infos.appendChild(description);
            work_infos.appendChild(work_logo);

            work.appendChild(work_image);
            work.appendChild(work_infos);

            console.log(work);

            elWorkContainer.appendChild(work);
        }
    })
};