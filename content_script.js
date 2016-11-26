var back = $("<div class='dim_overlay hide'><span class='close'></span></div>").appendTo("body");
var panel = $(`<div class = 'selection-panel'>
			<h3 class='card-title'></h3>
			<p class='card-content'></p>
			<button id='edit'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-pencil.png"/></button>
			<button id='settings'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-settings.png"/></button>
			<img id='logo-medium' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/logo-medium.png"/>
			<button class='acknowledge' id='textbutton'><span class='close'></span>continue</button>
		</div>`).appendTo(back);

$(".acknowledge").on("click", function(){
	back.addClass("hide");
});

$(window).on("click", function(event){
	back.addClass("hide");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    panel.children()[0].innerHTML = request.message.title;
    panel.children()[1].innerHTML = request.message.content;
    back.removeClass("hide");
});
