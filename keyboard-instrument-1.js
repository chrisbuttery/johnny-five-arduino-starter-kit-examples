/**
 * keyboard-instrument-1.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 7 - Keyboard Instrument
 *
 * This is pretty much a direct port of the starter kit example.
 * analogRead() methods are asynchronous and will continue to pull in voltage
 * meaning we're sending the voltage to the piezo as it comes in - giving
 * it a distorted effect.
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var notes = [262, 277, 330, 349];

board.on('ready', function() {
  var piezo = new five.Piezo(8);

  // allow command line access
  board.repl.inject({
    piezo: piezo
  });

  // open the flood gates
  this.analogRead(0, function(voltage) {
    if (voltage === 1023) {
      piezo.frequency(notes[0], 250);
    }
    else if (voltage >= 990 && voltage <= 1010) {
      piezo.frequency(notes[1], 250);
    }
    else if (voltage >= 505 && voltage <= 515) {
      piezo.frequency(notes[2], 250);
    }
    else if (voltage >= 5 && voltage <= 10) {
      piezo.frequency(notes[3], 250);
    }
    else {
      piezo.noTone();
    }
  });
});
