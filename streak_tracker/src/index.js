import "./jq-global.js";
import 'bootstrap'; 
import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css
import './index.css';
import "jquery-ui";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/themes/base/all.css";
import "jquery-ui/themes/base/base.css";
import Cookies from 'js.cookie';
import { EmojiPickerElement } from 'unicode-emoji-picker';

$( "#data_date" ).datepicker();

var data = Cookies.get('data');
if ( data == null ) {
  data = {};
}

const emojiPicker = document.querySelector('unicode-emoji-picker');
emojiPicker.addEventListener('emoji-pick', (event) => {
  console.log(event.detail.emoji);
  $("#data_emoji").val( event.detail.emoji  );
});


function update() {
  var streaks = $("#streaks");
  console.log(data);
  var today = new Date();
  var html = "";
  html += "<div class=container>";
  Object.keys(data).forEach( e => {
    var time_now = new Date( data[e]['date'] );
    var days = Math.floor((today - time_now) / 24 / 60 / 60 / 1000);
    var name = e.replaceAll('_',' ');
    //html += "<div class=display-4>";
    html += "<div class='row justify-content-end'>";
    html += "<div class='rg col-2' id=" + e + ">" + name + "(" + days + ")</div>";
    html += "<div class='col-10 emoji'>" + data[e]['emoji'].repeat(days) +"</div>";
    html += "</div>"; // row
    //html += "</div><br>";

  });
  html += "</div>"; // container

  streaks.html(html);

  Object.keys(data).forEach( e => {
   var element = document.getElementById(e);
    element.onclick = function(event) {
        edit(event.target.id);
    }
  });
}

function save(n,d,e) {
  data[ n ] = {"date": d, "emoji": e};
  Cookies.set('data',data, { expires: 3650 } ) ;
  update();
}

function edit(n) {
  
  $("#data_name").val( n.replaceAll('_',' '));
  $("#data_date").val( data[n]['date'] );
  $("#data_emoji").val( data[n]['emoji'] );
  $('#exampleModal').modal('show');
  
}

$('#delete').click( () => {
  var d_name = $("#data_name").val().replaceAll(' ','_');
  delete data[d_name];
  Cookies.set('data',data, { expires: 3650 } ) ;
  $('#exampleModal').modal('hide');
  update();
});

$('#save').click( () => {
  console.log("Save called");
  var d_name = $("#data_name").val().replaceAll(' ','_');
  var d_date = $("#data_date").val();
  var d_emoji = $("#data_emoji").val();
  save(d_name, d_date, d_emoji);

  $('#exampleModal').modal('hide');
});

update();
