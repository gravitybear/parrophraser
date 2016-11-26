// Load Database:
var config = {
  apiKey: "AIzaSyDlNHKYe_qJaCe3638zjywUZa1H_5WsMhQ",
  authDomain: "parrophrase.firebaseapp.com",
  databaseURL: "https://parrophrase.firebaseio.com",
  storageBucket: "parrophrase.appspot.com",
  messagingSenderId: "41847708887"
};

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("/");
var items = new Array();
var self = this;

// Load initial cards:
ref.on("child_added", function(snapshot, prevChildKey) {
  var node = snapshot.val();
  items.push(node);
});

// Add handshake for popupjs
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  chrome.runtime.sendMessage({items: self.items},function(response){});
});


function getAnnotatedText(text, numOfCards){
  var url  = "https://textanalysis-text-summarization.p.mashape.com/text-summarizer-text";

  var body = {
    url: "",
    text: text,
    sentnum: numOfCards
  };

  $.ajax({
      url: url,
      type: 'post',
      data: body,
      headers: {
          'X-Mashape-Authorization': '1w7tngYZa0mshC3mevnDzIaBBpbCp1SXQrJjsnaQQxxOkzcc7X',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
      },
      success: function (data) {
        data.sentences.forEach(generateCard);
      }
  });

}

function generateCard(sentence){
  var i = items.length+1;
  var title = sentence.split(" ")[0];
  database.ref("/"+i).set({title: title, content: sentence, index: i});
}

function handleTextSelect(info, tab) {
  var text = info.selectionText;
  getAnnotatedText(text, 1);
}


var id = chrome.contextMenus.create({"title": "Parrophraser", "contexts":["selection"],
                                     "onclick": handleTextSelect});
