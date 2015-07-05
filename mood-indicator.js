/**
 * mood-indicator.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 5  - Servo Mood Indicator
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var potVal;
var angle;

/**
 * Map
 * Re-maps a number from one range to another.
 * That is, a value of fromLow would get mapped to toLow,
 * a value of fromHigh to toHigh, values in-between to values in-between, etc.
 * https://www.arduino.cc/en/Reference/Map
 */

function map(val, fromLow, fromHigh, toLow, toHigh) {
  return ((val - fromLow) * (toHigh - toLow)) / ((fromHigh - fromLow) + toLow);
}

// Are we ready?

board.on('ready', function() {

  // Create a standard servo
  // Attach to pin ~9 and center it
  var servo = new five.Servo({
    pin: 9,
    center: true
  });

  // register handlers to read from sensor 0
  // use map() to define our range and set it as the angle of the servo
  this.analogRead(0, function(voltage) {
    redSensorValue = voltage;
    angle = map(voltage, 0, 1023, 0, 179);
    servo.to(angle);
  });
});
