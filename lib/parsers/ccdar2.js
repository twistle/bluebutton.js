/*
 * Parser for the CCDAR2 document
 */

Parsers.CCDAR2 = (function () {

  var run = function (ccda) {

    var data = {};

    data.document              = Parsers.CCDAR2.document(ccda);
    data.demographics          = Parsers.CCDA.demographics(ccda);
    data.health_concerns_document  = Parsers.CCDAR2.health_concerns_document(ccda);
    data.json                  = Core.json;

    // Decorate each section with Title, templateId and text and adds missing sections
    Parsers.GenericInfo(ccda, data);

    return data;
  };

  return {
    run: run
  };

})();
