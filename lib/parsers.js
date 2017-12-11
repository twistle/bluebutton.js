/*
 * ...
 */
var C32 = require('./parsers/c32');
var CCD = require('./parsers/ccd');
var CCDA = require('./parsers/ccda');
var CCDAR2 = require('./parsers/ccdar2');

var method = function () {};

/* exported Parsers */
module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  self.method = method;
  self.C32 = new C32(self.doc);
  self.CCD = new CCD(self.doc);
  self.CCDA = new CCDA(self.doc);
  self.CCDAR2 = new CCDAR2(self.doc);
}; 