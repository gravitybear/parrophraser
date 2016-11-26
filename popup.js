var self = this;

// Background
function ensureSendMessage(tabId, message, callback){
  chrome.tabs.sendMessage(tabId, {ping: true, message: message}, function(response){
    if(response) { // Content script ready
      chrome.tabs.sendMessage(tabId, message, callback);
    } else { // No listener on the other end
      chrome.tabs.executeScript(tabId, {file: "content_script.js"}, function(){
        if(chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          throw Error("Unable to inject script into tab " + tabId);
        }
        // OK, now it's injected and ready
        chrome.tabs.sendMessage(tabId, message, callback);
      });
    }
  });
}

chrome.runtime.sendMessage({data:"Handshake"},function(response){});
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){

  message.items.forEach(function(item){
    var node = $(".cardListItemTemplate").clone();
    node.removeClass("cardListItemTemplate");
    node.addClass("cardListItem");

    node.children()[0].innerHTML = item.title;
    node.children()[1].innerHTML = item.content;

    node.on("click", function(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        ensureSendMessage(tabs[0].id, {title: item.title, content: item.content, index: item.index});
      });
    });

    $("#cards").append(node);

  });
});
