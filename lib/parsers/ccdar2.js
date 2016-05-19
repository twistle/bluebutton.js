/*
 * Parser for the CCDA document
 */

Parsers.CCDAR2 = (function () {
  
  var run = function (ccda) {
    var data = {};
    
    data.document              = Parsers.CCDA.document(ccda);

    data.json                        = Core.json;

    return data;
  };

  return {
    run: run
  };
  
})();
