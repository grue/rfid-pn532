/*********************************************
RFID example
*********************************************/

var tessel = require('tessel');
var rfid = require("../").connect(tessel, tessel.port("A"));

var PN532_MIFARE_ISO14443A = 0x00;

var led1 = tessel.led(1).output().low();
var led2 = tessel.led(2).output().low();

// Initialize RFID
rfid.initialize(tessel.port("A"), function(firmware){
  // Configure SAM
  rfid.SAMConfig(function(config){
    led1.high();
    console.log("Ready to read RFID card");
     setImmediate(function loop () {
      led2.low();
      rfid.readPassiveTargetID(PN532_MIFARE_ISO14443A, function(uid){
        console.log("uid", uid);
        led2.high();
        setTimeout(loop, 200);
      });
    });
  });
});