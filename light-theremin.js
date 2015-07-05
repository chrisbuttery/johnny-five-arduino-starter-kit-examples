/**
 * light-theremin.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 6  - Light Theremin
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var low = 1023;
var high = 0;
var pitch;
var calibrated = false;

/**
 * Map
 * Re-maps a number from one range to another.
 * That is, a value of fromLow would get mapped to toLow,
 * a value of fromHigh to toHigh, values in-between to values in-between, etc.
 * https://www.arduino.cc/en/Reference/Map
 */

function map(val, fromLow, fromHigh, toLow, toHigh) {
  return (val - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}

// Are we ready?

board.on('ready', function() {
  var _this = this;
  var piezo = new five.Piezo(8);
  var led = new five.Led(13);
  var start = new Date().getTime();

  // Calibrate the sensor.
  // if `calibrated`, return
  // Otherwise turn on pin 13 (actuator)
  // Set the highest value of voltage to `high` and lowest to `low`.
  // turn off pin 13
  this.analogRead(0, function(voltage) {
    if (calibrated) {
      _this.digitalWrite(13, 0);
      return;
    }

    if (voltage > high) {
      high = voltage;
    }

    if (voltage < low) {
      low = voltage;
    }

    _this.digitalWrite(13, 1);
  });

  // Register a handler to be called once after 5 seconds.
  // This is used for calibration of the sensor.
  // After 5 seconds set `calibrated` to true and
  // output the pitch to the piezo
  this.wait(5000, function() {
    calibrated = true;

    _this.analogRead(0, function(voltage) {
      pitch = map(voltage, low, high, 50, 4000);
      piezo.tone(pitch, 20);
    });
  });
});
