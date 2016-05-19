/*
 * Parser for the CCDAR2 document
 */

Parsers.CCDAR2 = (function () {

  var run = function (ccdar2) {
    var data = {};

    data.document              = Parsers.CCDAR2.document(ccdar2);

    data.json                        = Core.json;

    return data;
  };

  return {
    run: run
  };

})();
