// Load Database:
var config = {
  apiKey: "AIzaSyDlNHKYe_qJaCe3638zjywUZa1H_5WsMhQ",
  authDomain: "parrophrase.firebaseapp.com",
  databaseURL: "https://parrophrase.firebaseio.com",
  storageBucket: "parrophrase.appspot.com",
  messagingSenderId: "41847708887"
};

var activeIndex = null;
firebase.initializeApp(config);


var back = $("<div class='dim_overlay hide'></div>").appendTo(body);
var panel1 = $(`<div class = 'selection-panel'>
			<h3 class='card-title'></h3>
			<p class='card-content'></p>
			<button id='edit'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-pencil.png"/></button>
			<button id='settings'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-settings.png"/></button>
			<img id='logo-medium' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/logo-medium.png"/>
			<button class='acknowledge' id='textbutton'><span class='close'></span>continue</button>
		</div>`)
var panel = panel1.appendTo(back);

function hide(event){
	back.addClass("hide");
}

function page_edit(event){
	$('.selection-panel').remove();

	panel = $(`<div class = 'selection-panel'>
			<input id="input-title" value="Title"/>
			<textarea id="input-content"></textarea>
			<h3 class='card-title'>Edit</h3>
			<button id='back'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-back.png"/></button>
			<button id='settings'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-settings.png"/></button>
			<img id='logo-medium' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/logo-medium.png"/>
			<button class='save' id='textbutton'>save</button>
		</div>`).appendTo(back);

}


function page_back(){
	var title = $('#input-title').text()
	var sentence = $('#input-content').text()
	$('.selection-panel').remove();
	panel = panel1.appendTo(back);
	$('card-title').text(title)
	$('card-content').text(sentence)
}

function save(event){
	var title = $('#input-title').var()
	var sentence = $('#input-content').text()
  	database.ref("/"+activeIndex).set({title: title, content: sentence, index: activeIndex});
	page_back();
}

$(".acknowledge").on("click", hide);
$("#edit").on("click", page_edit);
$("#back").on("click", page_back);
$(".save").on("click", save);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  panel.children()[0].innerHTML = request.message.title;
  panel.children()[1].innerHTML = request.message.content;
  activeIndex = request.message.index;
  back.removeClass("hide");
});
