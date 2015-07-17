/**
 * keyboard-instrument-2.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 7 - Keyboard Instrument
 *
 * In keyboard-instrument-1.js we just throw all the voltage at the piezo.
 * This time we just pluck out a value as we need it - resulting in short,
 * clear notes.
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
var voltage;

board.on('ready', function() {
  var piezo = new five.Piezo(8);
  var button = new five.Sensor(0);

  // allow command line access
  board.repl.inject({
    piezo: piezo,
    button: button
  });

  // open the flood gates and assign v to voltage
  this.analogRead(0, function(v) {
    voltage = v;
  });

  // on change, just grab what we need
  button.on('change', function() {
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
