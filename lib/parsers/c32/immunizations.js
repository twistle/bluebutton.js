/*
 * Parser for the C32 immunizations section
 */

Parsers.c32.immunizations = function (c32) {
  
  var parseDate = Documents.parseDate;
  var parseName = Documents.parseName;
  var parseAddress = Documents.parseAddress;
  var data = [], el;
  
  var immunizations = c32.section('immunizations');
  
  immunizations.entries().each(function(entry) {
    
    // date
    el = entry.tag('effectiveTime');
    var date = parseDate(el.attr('value'));
    
    // product
    el = entry.template('2.16.840.1.113883.10.20.1.53').tag('code');
    var product_name = el.attr('displayName'),
        product_code = el.attr('code'),
        product_code_system = el.attr('codeSystem'),
        product_code_system_name = el.attr('codeSystemName');
    
    // translation
    el = entry.template('2.16.840.1.113883.10.20.1.53').tag('translation');
    var translation_name = el.attr('displayName'),
        translation_code = el.attr('code'),
        translation_code_system = el.attr('codeSystem'),
        translation_code_system_name = el.attr('codeSystemName');
    
    // route
    el = entry.tag('routeCode');
    var route_name = el.attr('displayName'),
        route_code = el.attr('code'),
        route_code_system = el.attr('codeSystem'),
        route_code_system_name = el.attr('codeSystemName');
    
    // instructions
    el = entry.template('2.16.840.1.113883.10.20.1.49');
    var instructions_text = el.tag('text').val();
    el = el.tag('code');
    var education_name = el.attr('displayName'),
        education_code = el.attr('code'),
        education_code_system = el.attr('codeSystem');
    
    data.push({
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
        }
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
  
  return data;
};