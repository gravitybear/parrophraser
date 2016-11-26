var back = $("<div class='background hide'></div>").appendTo(body);
var panel = $("<div class='panel'><h4></h4><p></p></div>").appendTo(back);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  panel.children()[0].innerHTML = request.message.title;
  panel.children()[1].innerHTML = request.message.content;
  back.removeClass("hide");
});
