/*
 * Parser for the C32 vitals section
 */

module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  self.parse = parse;

  var parse = function (c32) {
    
    var parseDate = self.doc.parseDate;
    var parseName = self.doc.parseName;
    var parseAddress = self.doc.parseAddress;
    var vitals = c32.section('vitals');
  
    var data = {}, el;
    data.entries = [];
    data.displayName = "Vitals";
    data.templateId = vitals.tag('templateId').attr('root');
    data.text = vitals.tag('text').val(true);
    
    vitals.entries().each(function(entry) {
      
      el = entry.tag('effectiveTime');
      var entry_date = parseDate(el.attr('value'));
      
      var result;
      var results = entry.elsByTag('component');
      var results_data = [];
      
      for (var j = 0; j < results.length; j++) {
        result = results[j];
        
        // Results
        
        el = result.tag('code');
        var name = el.attr('displayName'),
            code = el.attr('code'),
            code_system = el.attr('codeSystem'),
            code_system_name = el.attr('codeSystemName');
        
        el = result.tag('value');
        var value = parseFloat(el.attr('value')),
            unit = el.attr('unit');
        
        results_data.push({
          name: name,
          code: code,
          code_system: code_system,
          code_system_name: code_system_name,
          value: value,
          unit: unit
        });
      }
      
      data.entries.push({
        date: entry_date,
        results: results_data
      });
    });
    
    return data;
  };
}