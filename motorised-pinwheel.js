/**
 * motorised-pinwheel.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 9 - Motorised Pinwheel
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var switchPin = 2;
var motorPin = 9;

board.on('ready', function() {
  var _this = this;

  // create out pins
  this.pinMode(motorPin, five.Pin.OUTPUT);
  this.pinMode(switchPin, five.Pin.INPUT);

  /**
   * Read the digital value of `switchPin`.
   * This will either be 1 (on) or 0 (off)
   * Write the value to the motor pin
   */
  this.digitalRead(switchPin, function(value) {
    _this.digitalWrite(motorPin, value);
  });
});
