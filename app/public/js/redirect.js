viewResult = document.getElementById('result');
newNotePage = document.getElementById('newNotePage');


if(newNotePage){
newNotePage.onclick = function(){
    redirect('new');
}
}

function redirect(url){
    window.location.href = url;
}
//start function -------------