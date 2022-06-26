// command-shift-j  will show the browser console which will show console message
// about:profiles create new testing profile

// console.log("Hello world");

var global_data;
var ratings = {};

async function set_slider() {
    // console.log("Set sliders called");
    url =  (await browser.tabs.query({currentWindow: true, active: true}))[0].url;
    ratings =  (await browser.storage.local.get("ratings"));

    if ('ratings' in ratings ) {
      ratings =  ratings['ratings'];
      // console.log("set ratings to:", ratings);
    } else {
      ratings = {}
    }

    // console.log("Loaded:", ratings);
    var v = 0;
    if ( url in ratings ) {
      v = ratings[url];
    }

    document.getElementById("interesting").value = v;
    document.getElementById('slider_val').innerHTML = v;
}

function onError(error) {
  console.log(error);
}

// nc -l -k localhost 8080
async function dumpData() {
  ratings =  (await browser.storage.local.get("ratings"))['ratings'];
  fetch("http://localhost:8080", {method: "POST", body: JSON.stringify( ratings )} );
  Object.keys(ratings).forEach(k => { console.log(k); });
}

async function storeUrl(rating) {
  var url = await browser.tabs.query({currentWindow: true, active: true});
  url = url[0].url;

  ratings[url] = rating;

  // console.log("ratings to store:", ratings);
  var storingNote = browser.storage.local.set({ratings,ratings});
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

