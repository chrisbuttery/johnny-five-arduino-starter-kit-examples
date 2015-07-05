/**
 * color-mixing-lamp.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 4  - Color Mixing Lamp
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();

var redValue;
var greenValue;
var blueValue;

var redSensorValue;
var greenSensorValue;
var blueSensorValue;

// Are we ready?

board.on('ready', function() {
  var _this = this;

  // define pins 9, 10 and 11 as PWM
  // PWM is the mode used to write ANALOG
  for (var i = 9; i <= 11; i++) {
    _this.pinMode(i, five.Pin.PWM);
  }

  // register handlers to read from sensors 0, 1 and 2
  // Set each `voltage` to a variable
  this.analogRead(0, function(voltage) {
    redSensorValue = voltage;
  });

  this.analogRead(1, function(voltage) {
    greenSensorValue = voltage;
  });

  this.analogRead(2, function(voltage) {
    blueSensorValue = voltage;
  });

  // every .25 of a second,
  // write the values to our RGB pins
  this.loop(250, function() {
    console.log(
      'Mapped Sensor Values: Red:' + redSensorValue +
      ' Green:' + greenSensorValue +
      ' Blue:' + blueSensorValue
    );

    redValue = Math.floor(redSensorValue / 4);
    greenValue = Math.floor(greenSensorValue / 4);
    blueValue = Math.floor(blueSensorValue / 4);

    console.log('Raw Sensor Values: Red:' + redValue +
    ' Green:' + greenValue +
    ' Blue:' + blueValue
    );

    this.analogWrite(9, redValue);
    this.analogWrite(10, greenValue);
    this.analogWrite(11, blueValue);
  });
});
