/*
 * Parser for any freetext section (i.e., contains just a single <text> element)
 */

var Core = require('../../core');

module.exports = function() {
  var self = this;

  self.free_text = function (ccda, sectionName) {    
    var data = {};
    
    var doc = ccda.section(sectionName);
    var text = Core.stripWhitespace(doc.tag('text').val(true));
    
    data = {
      text: text
    };

    return data;
  };
}
