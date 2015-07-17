
/**
 * spaceship-interface.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 2  - Spaceship Interface
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var interval;
var count = 0;

/**
 * LED pulse animation config
 */

var config = {
  easing: 'linear',
  cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
  keyFrames: [0, 10, 0, 50, 0, 255],
  onstop: function() {
    console.log('Animation stopped');
  }
};

// Are we ready?

board.on('ready', function() {

  // create our button and LEDs
  var button = new five.Button(2);
  var ledPins = [3, 4, 5];
  var leds = new five.Leds(ledPins);

  // LED:3 turn on and pulse
  leds[0].pulse(config);

  // on button press
  // Turn led 3 off
  // Toggle leds 4 and 5
  button.on('press', function() {
    console.log('Button pressed');

    // LED:3 stop pulse and turn off
    leds[0].stop().off();

    // create an interval for a 1/4 second.
    // toggling LED:4 and LED:5 on/off
    interval = setInterval(function() {
      if (count % 2 === 0) {
        leds[1].on();
        leds[2].off();
      } else {
        leds[1].off();
        leds[2].on();
      }

      count++;
    }, 250);
  });

  // on button release
  button.on('release', function() {
    console.log('Button released');

    // clear interval and reset count
    clearInterval(interval);
    count = 0;

    // reset LEDs
    leds[0].pulse(config);
    leds[1].off();
    leds[2].off();
  });
});
