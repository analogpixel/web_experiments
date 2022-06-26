var news = [];
var current = 0;
var ratings =[];

function get_news() {
   fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then( response => response.json())
    .then(data => {news = data; load_next()});
}

async function load_page(json) {

  ratings =  (await browser.storage.local.get("ratings"));

  if ('ratings' in ratings ) {
    ratings =  ratings['ratings'];
    // console.log("set ratings to:", ratings);
  } else {
    ratings = {}
  }

  if ( 'url' in json) {
    if (json['url'] in ratings) {
      console.log("Already saw this page");
      load_next();
    } else {
      browser.tabs.update({url: json['url']})
      .then( a => { window.close()}, a => console.log("error") );
    }
  }
}


function load_comments() {
  url = "https://news.ycombinator.com/item?id=" + current;

  browser.tabs.update({url: url})
  //.then( a => { window.close()}, a => console.log("error") );
}

function load_next() {

  if (news.length == 0) {
    get_news();
    return;
  }

  current = news.shift();
  var url = "https://hacker-news.firebaseio.com/v0/item/" + current + ".json";

  fetch(url)
  .then( response => response.json())
  .then( data => load_page(data) );

}

browser.commands.onCommand.addListener(function (command) {
   if (command === "toggle-nextpage") {
     load_next();
   }
   if (command === "toggle-comments") {
     load_comments();
   }
});

