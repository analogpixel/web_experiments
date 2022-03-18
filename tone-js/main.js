// https://tonejs.github.io/docs/14.7.77/index.html
// https://freesound.org/
// https://freesound.org/people/lebaston100/sounds/243628/  Heavy Rain

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

var brown_slider = document.getElementById("brown");
var white_slider = document.getElementById("white");
var pink_slider = document.getElementById("pink");
var rain_slider = document.getElementById("rain");

rain_slider.oninput = brown_slider.oninput = white_slider.oninput = pink_slider.oninput = function() {
  var obj = eval(this.id); // get the variable to the id being called

  if (this.value == 1) {
    obj.stop()
    obj.stopped = true;
  } else {
    if (obj.stopped) {
      obj.start();
    }
    obj.volume.value = map( this.value, 1, 100, -15,15);
    obj.stopped = false;
  }
}

const rain = new Tone.Player("rain.mp3").toDestination();
rain.loop = true;
rain.fadeOut = 4;
rain.fadeIn = 2;
const brown = new Tone.Noise({ volume: -10, type: "brown" }).toDestination();
const white = new Tone.Noise({ volume: -10, type: "white" }).toDestination();
const pink = new Tone.Noise({ volume: -10, type: "pink" }).toDestination();

rain.stopped = brown.stopped = white.stopped = pink.stopped = true;
/*
Tone.loaded().then(() => {
	rain.start();
});
*/
