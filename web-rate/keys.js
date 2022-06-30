var news = [];
var current = [];
var ratings =[];
var lastrefresh=0;
var seen = [];

function set_url(id) {
  seen.push(id)
  //browser.storage.local.set( {[id]: rating} );
  //browser.storage.local.set( {current_id: id});
  browser.storage.local.set( {current_id: id});
  browser.storage.local.set( {seen: seen} );
}

async function get_url(id) {
  var data = await browser.storage.local.get('seen');
  // if seen hasn't been set yet, set to []
  seen = data['seen'] || [];
  return seen.includes(id);

}

// browser.storage.local.get().then( r=> console.log(r) );

function get_news() {
  console.log("Refresh the news");
  lastrefresh = Math.round(Date.now() / 1000);
  fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then( response => response.json())
    .then(data => {news = data; load_next()});
}

async function load_page(json) {

  if ( 'url' in json) {
    var url_to_load = json['url'];
  } else {
    // no url means this is local to hacker news, so just go to the comments
    var url_to_load = "https://news.ycombinator.com/item?id=" + json['id'];
  }

  var data = (await browser.storage.local.get('block_list'))['block_list'] || "";
  
  data = data.trim().split('\n') || [];

  if (data != "") {
    data.forEach( d => { 
    if (url_to_load.includes(d)) {
      console.log("blocking ", url_to_load, " based on:", d);
      load_next();
    }
    } );
  }
  console.log("block list is:", data);

  // the the initial value to 0
  browser.storage.local.set({[url_to_load]: 0}).then( console.log("set")) ;

  browser.tabs.update({url: url_to_load})
    .then( a => { window.close()}, a => console.log("error") );
}

function load_comments() {
  url = "https://news.ycombinator.com/item?id=" + current;
  browser.tabs.update({url: url})
}

async function load_next() {

  // refresh if no news, or haven't refreshed in 10minutes
  if  ( news.length ==0 || ((Math.round(Date.now() / 1000) )-lastrefresh > 60 * 10 ) ) {
    get_news();
    return;
  }

  current = news.shift();
  var rating = await get_url(current); 

  if (rating === false) {
    console.log("next current:", current);
    var url = "https://hacker-news.firebaseio.com/v0/item/" + current + ".json";
    set_url( current, 0); // mark as visited 

    fetch(url)
      .then( response => response.json())
      .then( data => load_page(data) );
  } else {
    console.log("already saw this");
    load_next();
  }

}

browser.commands.onCommand.addListener(function (command) {
  if (command === "toggle-nextpage") {
    load_next();
  }
  if (command === "toggle-comments") {
    load_comments();
  }
});

