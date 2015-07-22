/**
 * love-o-meter.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 3  - Love-O-Meter
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var baselineTemp = parseFloat(Math.round(20 * 100) / 100).toFixed(2);
var sensorVal;
var voltage;
var temperature;

board.on('ready', function() {
  var _this = this;

  // register an anolog pin at A0
  this.pinMode(0, five.Pin.ANALOG);

  // loop through pins 2 - 5, register and turn them off
  for (var i = 2; i <= 5; i++) {
    _this.pinMode(i, five.Pin.OUTPUT);
    _this.digitalWrite(i, 0);
  }

  // register a handler to listen to voltage changes on pin A0
  this.analogRead(0, function(volts) {
    var _this = this;
    sensorVal = volts;
    voltage = ((sensorVal / 1024) * 5).toFixed(2);
    temperature = ((((sensorVal / 1024) * 5) - 0.5) * 100).toFixed(2);

    console.log('Sensor Value: ' + sensorVal + ' Voltage: ' + voltage + ' Temperature: ' + temperature);

    // every second, write a digital value to pins 2, 3 and 4.
    this.loop(1000, function() {
      if (temperature < baselineTemp) {
        _this.digitalWrite(2, 0);
        _this.digitalWrite(3, 0);
        _this.digitalWrite(4, 0);
      }
      else if (temperature >= baselineTemp + 2 && temperature < baselineTemp + 4) {
        _this.digitalWrite(2, 1);
        _this.digitalWrite(3, 0);
        _this.digitalWrite(4, 0);
      }
      else if (temperature >= baselineTemp + 4 && temperature < baselineTemp + 6) {
        _this.digitalWrite(2, 1);
        _this.digitalWrite(3, 1);
        _this.digitalWrite(4, 0);
      }
      else if (temperature >= baselineTemp + 6) {
        _this.digitalWrite(2, 1);
        _this.digitalWrite(3, 1);
        _this.digitalWrite(4, 1);
      }
    });
  });
});
