/**
 * touchy-feely-lamp.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 13 - Touchy Feely Lamp
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {
  var _this = this;

  // create a button
  var touch = new five.Button(2);

  // define the LED
  this.pinMode(12, five.Pin.OUTPUT);
  this.digitalWrite(12, 0);

  // on touch
  touch.on('press', function() {
    _this.digitalWrite(12, 1);
  });

  // on release
  touch.on('release', function() {
    _this.digitalWrite(12, 0);
  });
});
