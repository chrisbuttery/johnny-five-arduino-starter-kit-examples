/**
 * zoetrope.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 10  - Zoetrope
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();

var motorSpeed = 0;
var goForward = true;
var isRunning = false;

board.on('ready', function() {
  var directionSwitch = new five.Button(4);
  var onOffSwitch = new five.Button(5);
  var motor = new five.Motor([9, 3, 2]);
  var potPin = new five.Sensor({
    pin: 'A0',
    freq: 250
  });

  // allow command line access
  board.repl.inject({
    onOffSwitch: onOffSwitch,
    directionSwitch: directionSwitch,
    potPin: potPin,
    motor: motor
  });

  // Listen for onOffSwitch 'press' event
  // toggle `isRunning` and start/stop motor
  onOffSwitch.on('press', function() {
    isRunning = !isRunning;

    if (isRunning) {
      motorStart();
    } else {
      motorStop()
    }
  });

  // Listen for directionSwitch 'press' event
  // toggle `goForward`
  // set isRunning to true (as this will start the motor)
  // call motorForward() or motorReverse()
  directionSwitch.on('press', function() {
    goForward = !goForward;
    if (!isRunning) isRunning = true;

    if (goForward) {
      motorForward();
    } else {
      motorReverse();
    }
  });

  // Listen to 'data' event on the Potentiometer
  // If the motor isn't running - get out
  // As the motor is running, set `motorSpeed`
  // Send the new speed through to a running motor
  potPin.on('data', function() {
    if (!isRunning) return;
    motorSpeed = this.value / 4;

    if (goForward) {
      motorForward(motorSpeed);
    } else {
      motorReverse(motorSpeed);
    }
  });

  /**
   * motorStart
   * Start the motor
   */

  function motorStart() {
    motor.start(motorSpeed);
  }

  /**
   * motorForward
   * Set the direction of the motor
   * Use `speed` if passed in, or default `motorSpeed`
   * @param  {Number} speed
   */

  function motorForward(speed) {
    motorSpeed = speed || motorSpeed;
    motor.forward(motorSpeed);
  }

  /**
   * motorReverse
   * Set the direction of the motor
   * Use `speed` if passed in, or default `motorSpeed`
   * @param  {Number} speed
   */

  function motorReverse(speed) {
    motorSpeed = speed || motorSpeed;
    motor.reverse(motorSpeed);
  }

  /**
   * motorStop
   * Stop the motor
   */

  function motorStop() {
    motor.stop();
  }
});
