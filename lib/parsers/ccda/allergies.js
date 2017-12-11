/*
 * Parser for the CCDA allergies section
 */

var Core = require('../../core');

module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  
  self.allergies = function (ccda) {
    
    var parseDate = self.doc.parseDate;
    var parseName = self.doc.parseName;
    var parseAddress = self.doc.parseAddress;
    var allergies = ccda.section('allergies');
  
      var data = {}, el;
      data.entries = [];
      data.displayName = "Allergies";
      data.templateId = allergies.tag('templateId').attr('root');
      data.text = allergies.tag('text').val(true);
    
    allergies.entries().each(function(entry) {
      
      el = entry.tag('effectiveTime');
      var start_date = parseDate(el.tag('low').attr('value')),
          end_date = parseDate(el.tag('high').attr('value'));
      
      el = entry.template('2.16.840.1.113883.10.20.22.4.7').tag('code');
      var name = el.attr('displayName'),
          code = el.attr('code'),
          code_system = el.attr('codeSystem'),
          code_system_name = el.attr('codeSystemName');
      
      // value => reaction_type
      el = entry.template('2.16.840.1.113883.10.20.22.4.7').tag('value');
      var reaction_type_name = el.attr('displayName'),
          reaction_type_code = el.attr('code'),
          reaction_type_code_system = el.attr('codeSystem'),
          reaction_type_code_system_name = el.attr('codeSystemName');
      
      // reaction
      el = entry.template('2.16.840.1.113883.10.20.22.4.9').tag('value');
      var reaction_name = el.attr('displayName'),
          reaction_code = el.attr('code'),
          reaction_code_system = el.attr('codeSystem');
      
      // severity
      el = entry.template('2.16.840.1.113883.10.20.22.4.8').tag('value');
      var severity = el.attr('displayName');
      
      // participant => allergen
      el = entry.tag('participant').tag('code');
      var allergen_name = el.attr('displayName'),
          allergen_code = el.attr('code'),
          allergen_code_system = el.attr('codeSystem'),
          allergen_code_system_name = el.attr('codeSystemName');
  
      // this is not a valid place to store the allergen name but some vendors use it
      if (!allergen_name) {
        el = entry.tag('participant').tag('name');
        if (!el.isEmpty()) {
          allergen_name = el.val();
        }
      }
      if (!allergen_name) {
        el = entry.template('2.16.840.1.113883.10.20.22.4.7').tag('originalText');
        if (!el.isEmpty()) {
          allergen_name = Core.stripWhitespace(el.val());
        }
      }
      
      // status
      el = entry.template('2.16.840.1.113883.10.20.22.4.28').tag('value');
      var status = el.attr('displayName');
      
      data.entries.push({
        date_range: {
          start: start_date,
          end: end_date
        },
        name: name,
        code: code,
        code_system: code_system,
        code_system_name: code_system_name,
        status: status,
        severity: severity,
        reaction: {
          name: reaction_name,
          code: reaction_code,
          code_system: reaction_code_system
        },
        reaction_type: {
          name: reaction_type_name,
          code: reaction_type_code,
          code_system: reaction_type_code_system,
          code_system_name: reaction_type_code_system_name
        },
        allergen: {
          name: allergen_name,
          code: allergen_code,
          code_system: allergen_code_system,
          code_system_name: allergen_code_system_name
        }
      });
    });
    
    return data;
  };
}