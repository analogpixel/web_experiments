// ==UserScript==
// @name     Meetup Unsubscriber
// @version  1
// @grant    none
// @namespace https://www.meetup.com
// @include https://www.meetup.com/*
// @run-at document-idle
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==


/*
1) go to https://www.meetup.com/groups/
2) wait 2 seconds
3) there will be a list at the very bottom of the page of all the groups on the page, click on the ones you want to leave.
*/

/*
Get an inital list of links, we'll use this later to filter out which links 
are groups
*/
var init_links=[];
var links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++) {
  init_links.push(  links[i].href );
}


function page_load() {
  var links = document.querySelectorAll("a");
  console.log("checking");
  for(var i=0; i<links.length; i++) {
    // find all the links that aren't in the inital list at the top, and end in a /
    if (! init_links.includes( links[i].href)) {
      if (links[i].href.slice(-1) == "/") {

        var group_name = links[i].href.split("/").slice(-2)[0];

        // Add a button you can click at the bottom of the page to leave the group
        $("#main_footer").append ('<a id=' + group_name + '>Leave group ' + group_name + '</a><br>');

        $("#" + group_name).click ( function () {
          console.log("remove", this.id);

          var self = this;

          // to unsubscribe it requires an ID, so grab the ID off that page and then unsubscribe from the page.
          $.get("https://www.meetup.com/" + self.id + "/unsubscribe/", function( data ) {

            var token = data.match('name="token" value="(.*)"')[1];
            //console.log("token:", token);
            //console.log(self.id);
            $("#" + self.id).remove();
            $.post( "/" + self.id + "/unsubscribe/", {"exit_comment": "", "op":"submit", "token": token} );


          });
        });

      }
    }   
  }

}

// give the page time to populate all the data on the page.

setTimeout(page_load, 2000);
