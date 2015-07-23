/**
 * crystal-ball.js
 * Arduino Starter Kit example converted to johnny-five
 * Project 11 - Crystal Ball
 *
 * Arduino Starter Kit:
 * http://www.arduino.cc/starterKit
 *
 * Examples:
 * https://github.com/arduino/Arduino/tree/master/build/shared/examples/10.StarterKit
 */

var five = require('johnny-five');
var board = new five.Board();
var lastNum;
var num;

function getUniqueRandomNumber() {
  var rand = Math.floor(Math.random() * 7) + 1;

  if (rand !== lastNum) {
    lastNum = rand;
    return rand;
  } else {
    return getUniqueRandomNumber();
  }
}

board.on('ready', function() {
  var _this = this;

  // create sensor from the Tilt switch
  var tilt = new five.Sensor.Digital(6);

  var lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 12  11   5   4   3   2
    pins: [12, 11, 5, 4, 3, 2],
    rows: 2,
    cols: 16
  });

  // allow command line access
  this.repl.inject({
    lcd: lcd
  });

  // Tell the LCD you want use this character:
  lcd.useChar('heart');

  // map our replies to numbers
  var replies = {
    1: 'Yes',
    2: 'Certainly',
    3: 'Outlook good',
    4: 'Unsure',
    5: 'Ask again',
    6: 'Doubtful',
    7: 'No',
    8: 'I :heart: johnny-five'
  };

  /**
   * welcome
   * Write the welcoming message
   */

  function welcome() {
    lcd.clear().cursor(0, 0).print('Ask the');
    lcd.cursor(1, 0);
    lcd.print('Crystal Ball!');
  }

  /**
   * reply
   * Get a random number.
   * Map the random to a reply key in `replies`
   * Write the reply
   */

  function reply() {
    num = getUniqueRandomNumber();
    lcd.clear().cursor(0, 0).print('the ball says:');
    lcd.cursor(1, 0);
    lcd.print(replies[num]);
  }

  /**
   * When the tilt switch fires a 0 value (LOW), we
   * know it's stopped moving, so:
   * - create a half second deplay
   * - call reply()
   */

  tilt.on('change', function() {
    if (this.value === 1) {
      return;
    }

    _this.wait(500, function() {
      reply();
    });
  });

  // kick off the welcome message
  welcome();
});
