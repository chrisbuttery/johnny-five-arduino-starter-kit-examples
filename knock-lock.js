/**
 * knock-lock.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 12 - Knock Lock
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();

var red = 5;
var green = 4;
var yellow = 3;
var pins = [red, green, yellow];
var isLocked = false;
var numOfKnocks =  0;
var quietKnock = 0;
var loudKnock = 100;

board.on('ready', function() {
  var _this = this;
  var sensor = new five.Sensor('A0');
  var button = new five.Button(2);
  var servo = new five.Servo({
    pin: 9,
    startAt: 0
  });

  // allow command line access
  board.repl.inject({
    sensor: sensor,
    button: button,
    servo: servo
  });

  // create out pins
  pins.forEach(function(pin) {
    _this.pinMode(pin, five.Pin.OUTPUT);
  });

  /**
   * lock
   * set `isLocked` to true
   * show red LED
   */
  function lock() {
    isLocked = true;
    servo.to(0);
    _this.digitalWrite(red, 1);
    _this.digitalWrite(green, 0);
    console.log('The box is locked');
  }

  /**
   * unlock
   * reset `numOfKnocks` and `isLocked`
   * Show green LED
   */
  function unlock() {
    numOfKnocks = 0;
    isLocked = false;
    servo.to(90);
    _this.digitalWrite(red, 0);
    _this.digitalWrite(green, 1);
    _this.digitalWrite(yellow, 0);
    console.log('The box is unlocked');
  }

  /**
   * checkForKnock
   * validate the value of the knock
   * if it registers between 0 and 100 it's valid
   * overwise invalid
   * @param  {Number} val: value of the piezo sensor
   * @return {Boolean}
   */

  function checkForKnock(val) {
    if (val > quietKnock && val < loudKnock) {
      _this.digitalWrite(yellow, 1);
      console.log('Valid knock of value: ', val);
      _this.wait('50', function() {
        _this.digitalWrite(yellow, 0);
      });

      return true;
    } else {
      console.log('Bad knock value: ', val);
      return false;
    }
  }

  // if `isLocked` isnt true,
  // set it to true and call lock()
  button.on('press', function() {
    if (isLocked) {
      return;
    }

    lock();
  });

  // kick off the initial state of the app
  unlock();

  // every 100 milliseconds read the value of the sensor.
  // validate a knock value and increment numOfKnocks.
  // if numOfKnocks => 3, call unlock()
  this.loop(100, function() {
    if (sensor.value === 0) {
      return;
    }

    if (numOfKnocks < 3 && checkForKnock(sensor.value)) {
      console.log((3 - numOfKnocks) + ' more knocks to go');
      numOfKnocks++;
    }

    if (numOfKnocks >= 3) {
      unlock();
    }
  });
});
