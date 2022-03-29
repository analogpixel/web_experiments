var noSleep = new NoSleep();
var session_length = 0;
var seconds_since_start = 0;
var second_timer_func;
var breath_time = 0;
$("#circle").hide();
var tick = new Audio('sounds/tick.wav');
var elem = document.documentElement;

var bi;  
var bh; 
var br; 
var bh2;

var gui = new Gui("myGui", [   
  {'name': 'Breath In', 'type': 'string', 'default': 4},
  {'name': 'Breath Hold', 'type': 'string', 'default': 4},
  {'name': 'Breath Release', 'type': 'string', 'default': 4},
  {'name': 'Breath Hold 2', 'type': 'string', 'default': 4},
  {'name': 'Breath Tick', 'type': 'boolean', 'default': true}
]);


function play_tick() {
  if ( gui.get("Breath Tick") )  {
    tick.play();
  }
}

function start_session() {
  toggleNav();

  $("BODY").css("background", "black");

  // Breath Time
  bi = parseInt(gui.get("Breath In"));
  bh = parseInt(gui.get("Breath Hold"));
  br = parseInt(gui.get("Breath Release"));
  bh2 = parseInt(gui.get("Breath Hold 2"));

  // clear all the timers that might be running
  var maxId = setTimeout(function(){}, 0);
  for(var i=0; i < maxId; i+=1) { 
    clearTimeout(i);
  }

  $("#circle").show();
  grow();
}

function grow() {
  play_tick();
  $("#circle").css("animation-duration", bi + "s");
  $("#circle").css("animation-name", "grow");
  $("#circle").removeClass("circle_animation").addClass("circle_animation"); // reset the animation to make ticks line up
  setTimeout( play_tick, (bi) * 1000);
  setTimeout( shrink, (bi + bh) * 1000);
}

function shrink() {
  play_tick();
  $("#circle").css("animation-duration", br + "s");
  $("#circle").css("animation-name", "shrink");
  $("#circle").removeClass("circle_animation").addClass("circle_animation"); // reset the animation to make ticks line up
  setTimeout( play_tick, (br) * 1000);
  setTimeout( grow, (br + bh2) * 1000);
}

function toggleNav() {
  $("#mySidebar").toggleClass("toggled");
  $("#main").toggleClass("toggled");
}

document.addEventListener('click', function enableNoSleep() {
  document.removeEventListener('click', enableNoSleep, false);
  noSleep.enable();
}, false);

