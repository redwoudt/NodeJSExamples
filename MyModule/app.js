'use strict';
const Enigma = require('./enigma');
const eng = new Enigma('magrathea');

let encodeSring = eng.encode("Don't Panic");
let decodeString = eng.decode(encodeSring);

console.log("Encode: ", encodeSring);
console.log("Decode: ", decodeString);

let qr = eng.qrgen("http://www.npmjs.com", "outImage.png");

qr ? console.log('QR Code created!') : console.log('QR Code Failed!');