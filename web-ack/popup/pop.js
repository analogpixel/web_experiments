// command-shift-j  will show the browser console which will show console message
// about:profiles create new testing profile

console.log("Hello world");

var global_data;

function init() {

  loadNotes();
  document.getElementById("web-ack-text").focus();
  document.getElementById("web-ack-button").addEventListener("click", function() {
    var text = document.getElementById("web-ack-text").value;
    global_data.unshift( text );
    
    //  browser.storage.sync.set({ web-ack-counter: 1 });
    storeNote("hello", global_data);
    console.log("gd:", global_data);  
    document.getElementById("web-ack-past").innerHTML = global_data.join("<br>");
    window.close();
  });
}

function onError(error) {
  console.log(error);
}

function loadNotes() {
  var gettingItem = browser.storage.local.get({hello: ['<br>']} );

  gettingItem.then(
    //(result) => { document.getElementById("web-ack-counter").innerHTML = result['hello'];},
    (result) => { global_data = result['hello'];
      document.getElementById("web-ack-past").innerHTML = result['hello'].join("<br>");
    },
    (result) => { console.log("error loading data"); }
  );
}

function storeNote(title, body) {
  var storingNote = browser.storage.local.set({ [title] : body });
  storingNote.then(() => {
    // console.log("Note stored");
  }, onError);
}

init();


