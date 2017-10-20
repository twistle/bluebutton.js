/*
 * Parser for the C32 immunizations section
 */

module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  self.parse = parse;

  function parse(c32) {
    
    var parseDate = self.doc.parseDate;
    var parseName = self.doc.parseName;
    var parseAddress = self.doc.parseAddress;
    var administeredData = {}, declinedData = {}, product, el;
  
    var immunizations = c32.section('immunizations');
  
    administeredData.entries = [];
    administeredData.displayName = "Immunizations";
    administeredData.templateId = immunizations.tag('templateId').attr('root');
    administeredData.text = immunizations.tag('text').val(true);
  
    declinedData.entries = [];
    declinedData.displayName = "Immunizations Declined";
    declinedData.templateId = immunizations.tag('templateId').attr('root');
    declinedData.text = immunizations.tag('text').val(true);
  
  
    
    immunizations.entries().each(function(entry) {
      
      // date
      el = entry.tag('effectiveTime');
      var date = parseDate(el.attr('value'));
      if (!date) {
        date = parseDate(el.tag('low').attr('value'));
      }
  
      // if 'declined' is true, this is a record that this vaccine WASN'T administered
      el = entry.tag('substanceAdministration');
      var declined = el.boolAttr('negationInd');
  
      // product
      product = entry.template('2.16.840.1.113883.10.20.1.53');
      el = product.tag('code');
      var product_name = el.attr('displayName'),
          product_code = el.attr('code'),
          product_code_system = el.attr('codeSystem'),
          product_code_system_name = el.attr('codeSystemName');
  
      // translation
      el = product.tag('translation');
      var translation_name = el.attr('displayName'),
          translation_code = el.attr('code'),
          translation_code_system = el.attr('codeSystem'),
          translation_code_system_name = el.attr('codeSystemName');
  
      // misc product details
      el = product.tag('lotNumberText');
      var lot_number = el.val();
  
      el = product.tag('manufacturerOrganization');
      var manufacturer_name = el.tag('name').val();
      
      // route
      el = entry.tag('routeCode');
      var route_name = el.attr('displayName'),
          route_code = el.attr('code'),
          route_code_system = el.attr('codeSystem'),
          route_code_system_name = el.attr('codeSystemName');
      
      // instructions
      el = entry.template('2.16.840.1.113883.10.20.1.49');
      var instructions_text = Core.stripWhitespace(el.tag('text').val());
      el = el.tag('code');
      var education_name = el.attr('displayName'),
          education_code = el.attr('code'),
          education_code_system = el.attr('codeSystem');
  
      // dose
      el = entry.tag('doseQuantity');
      var dose_value = el.attr('value'),
          dose_unit = el.attr('unit');
      
      var data = (declined) ? declinedData : administeredData;
      data.entries.push({
        date: date,
        product: {
          name: product_name,
          code: product_code,
          code_system: product_code_system,
          code_system_name: product_code_system_name,
          translation: {
            name: translation_name,
            code: translation_code,
            code_system: translation_code_system,
            code_system_name: translation_code_system_name
          },
          lot_number: lot_number,
          manufacturer_name: manufacturer_name
        },
        dose_quantity: {
          value: dose_value,
          unit: dose_unit
        },
        route: {
          name: route_name,
          code: route_code,
          code_system: route_code_system,
          code_system_name: route_code_system_name
        },
        instructions: instructions_text,
        education_type: {
          name: education_name,
          code: education_code,
          code_system: education_code_system
        }
      });
    });
    
    return {
      administered: administeredData,
      declined: declinedData
    };
  };
}
