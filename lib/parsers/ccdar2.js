/*
 * Parser for the CCDAR2 document
 */

Parsers.CCDAR2 = (function () {

  var run = function (ccda) {
    var data = {};

    data.document              = Parsers.CCDAR2.document(ccda);
    data.demographics          = Parsers.CCDA.demographics(ccda);

    data.json                        = Core.json;

    return data;
  };

  return {
    run: run
  };

})();
