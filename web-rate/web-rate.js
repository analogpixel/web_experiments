// command-shift-j  will show the browser console which will show console message
// about:profiles create new testing profile

// console.log("Hello world");

var global_data;
var ratings = {};
var news = [];
var current = 0;

async function set_slider() {
  // console.log("Set sliders called");
  // var url =  (await browser.tabs.query({currentWindow: true, active: true}))[0].url;
  var current_id =  (await browser.storage.local.get("current_id"))['current_id'];
  var rating =  (await browser.storage.local.get())[current_id];

  if (rating === false) {
    v = 0;
  } else {
    v = rating;
  }

  document.getElementById("interesting").value = v;
  document.getElementById('slider_val').innerHTML = v;
}

function onError(error) {
  console.log(error);
}

// nc -l -k localhost 8080
async function dumpData() {
  ratings =  (await browser.storage.local.get());
  fetch("http://localhost:8080", {method: "POST", body: JSON.stringify( ratings )} );
  //Object.keys(ratings).forEach(k => { console.log(k); });
  console.log(ratings);
}

async function storeUrl(rating) {
  // var url = await browser.tabs.query({currentWindow: true, active: true});
  // url = url[0].url;
  //ratings[url] = rating;

  var current_id =  (await browser.storage.local.get("current_id"))['current_id'];
  var v = parseInt(document.getElementById("interesting").value) ;
  var storingNote = browser.storage.local.set({[current_id]: v});
  storingNote.then(() => {
    // console.log("Note stored");
  }, onError);
}

// set the inital slider value
set_slider();

document.getElementById("dump_data").addEventListener("click", function() {
  dumpData();
});

document.getElementById("interesting").addEventListener("input", function() {
  document.getElementById('slider_val').innerHTML = this.value;
});

document.getElementById("interesting").addEventListener("change", function() {
  var v = this.value;
  storeUrl(v);
  window.close();
});

