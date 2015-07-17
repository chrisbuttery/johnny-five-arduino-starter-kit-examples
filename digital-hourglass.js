/**
 * digital-hourglass.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 8 - Digital Hourglass
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();

var leds = [2, 3, 4, 5, 6, 7];
var previousTime;
var delay = 6000;
var currentTime;
var count = 0;

// Are we ready?

board.on('ready', function() {
  var _this = this;

  // create sensor from the Tilt switch
  var tilt = new five.Sensor.Digital(8);

  /**
   * resetLEDs
   * For each of the values in `leds`
   * create a pin and turn it off
   */

  function resetLEDs() {
    leds.forEach(function(led) {
      _this.pinMode(led, five.Pin.OUTPUT);
      _this.digitalWrite(led, 0);
    });
  }

  /**
   * stopInterval
   * If there's no current interval, return
   * Otherwise clear it
   */
  function stopInterval() {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);
  }

  /**
   * startInterval
   * set `count` and `previousTime` to 0
   * Create a setInterval:
   * - check that the differnce between previousTime and currentTime
   * are greater than the delay.
   * If so, reset previousTime to currentTime
   * Pick an LED and turn it on
   * Increment the count.
   * If count equals the amount of `leds`, stop the interval
   */

  function startInterval() {
    count = 0;
    previousTime = 0;

    this.interval = setInterval(function() {
      currentTime = new Date().getTime();

      if ((currentTime - previousTime) > delay) {
        previousTime = currentTime;
        _this.digitalWrite(leds[count], 1);
        count++;

        if (count === leds.length) {
          stopInterval();
        }
      }
    }, delay);
  }

  /**
   * When the tilt switch fires a 0 value (LOW), we
   * know it's stopped moving, so:
   * - stop the interval
   * - reset the LEDs again
   * - start the interval
   */

  tilt.on('change', function() {
    if (this.value === 1) return;
    stopInterval();
    resetLEDs();
    startInterval();
  });

  // set up the LEDs
  resetLEDs();

  // kick of the interval
  startInterval();
});
