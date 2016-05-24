/*
 * Parser for the CCDAR2 document
 */

Parsers.CCDAR2 = (function () {

  var run = function (ccda) {
    var data = {};

    var each = function (callback) {
      for (var i = 0; i < this.length; i++) {
        callback(this[i]);
      }
    };

    data.document              = Parsers.CCDAR2.document(ccda);
    data.demographics          = Parsers.CCDA.demographics(ccda);
    data.health_concerns_document  = Parsers.CCDAR2.health_concerns_document(ccda);
    data.json                  = Core.json;

    // Add generic sections with just text and title if the key hasn't already
    // been added to the data object
    var allSections = ccda.elsByTag('section');
    allSections.each = each;

    allSections.each(function(s){

      var code = s.tag('code').attr('displayName');

      if(code) {
        var nodeName = code.split(' ').join('_').toLowerCase();
        if(!data[nodeName]) {
          data[nodeName] = {};
        }
        data[nodeName].displayName = code;
        data[nodeName].templateId = s.tag('templateId').attr('root');
        data[nodeName].text = s.tag('text').val();
      }


    });

    return data;
  };

  return {
    run: run
  };

})();
