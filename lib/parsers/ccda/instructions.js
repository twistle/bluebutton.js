/*
 * Parser for the CCDA "plan of care" section
 */

Parsers.CCDA.instructions = function (ccda) {
  
  var data = [], el;
  
  var instructions = ccda.section('instructions');
  data.templateId = instructions.tag('templateId').attr('root');
  
  instructions.entries().each(function(entry) {

    el = entry.tag('code');
    var name = el.attr('displayName'),
        code = el.attr('code'),
        code_system = el.attr('codeSystem'),
        code_system_name = el.attr('codeSystemName');

    var text = Core.stripWhitespace(entry.tag('text').val(true));
    
    data.push({
      text: text,
      name: name,
      code: code,
      code_system: code_system,
      code_system_name: code_system_name
    });
  });
  
  return data;
};
