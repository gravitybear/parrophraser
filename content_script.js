// Load Database:
var config = {
  apiKey: "AIzaSyDlNHKYe_qJaCe3638zjywUZa1H_5WsMhQ",
  authDomain: "parrophrase.firebaseapp.com",
  databaseURL: "https://parrophrase.firebaseio.com",
  storageBucket: "parrophrase.appspot.com",
  messagingSenderId: "41847708887"
};

var activeIndex = null;
var title = null;
var content = null;

firebase.initializeApp(config);


var back = $("<div class='dim_overlay hide'></div>").appendTo(body);
var panel1 = $(`<div class = 'selection-panel'>
			<h3 class='card-title'></h3>
			<p class='card-content'></p>
			<button id='edit'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-pencil.png"/></button>
			<button id='settings'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-settings.png"/></button>
			<img id='logo-medium' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/logo-medium2.png"/>
			<button class='acknowledge' id='textbutton'><span class='close'></span>continue</button>
		</div>`)
var panel = panel1.appendTo(back);

function hide(event){
	back.addClass("hide");
}

function page_back(){
	var title = $('#input-title').text()
	var sentence = $('#input-content').text()
	$('.selection-panel').remove();
	panel = panel1.appendTo(back);
	$('card-title').text(title)
	$('card-content').text(sentence)
}

function page_edit(event){
	$('.selection-panel').remove();

	panel = $(`<div class = 'selection-panel'>
			<input id="input-title" value="`+title+`"/>
			<textarea id="input-content">`+content+`</textarea>
			<h3 class='card-title'>Edit</h3>
			<button id='back'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-back.png"/></button>
			<button id='settings'><img id='icon' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/icon-settings.png"/></button>
			<img id='logo-medium' src="https://github.com/Lucaszw/parrophraser/raw/master/assets/logo-medium2.png"/>
			<button class='save' id='textbutton' onclick='page_back.bind(this)'>save</button>
		</div>`).appendTo(back);

}




function save(){
	// var title = $('#input-title').innerHTML;
	// var content = $('#input-content').innerHTML();

  // database.ref("/"+activeIndex).set({title: title, content: sentence, index: activeIndex});
	page_back();
}

$(".acknowledge").on("click", hide);
$("#edit").on("click", page_edit);
$("#back").on("click", page_back);
$(".save").on("click", save);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  title = panel.children()[0].innerHTML = request.message.title;
  content = panel.children()[1].innerHTML = request.message.content;
  activeIndex = request.message.index;
  back.removeClass("hide");
});
