/*
 * Parser for the CCDA "plan of care" section
 */

Parsers.CCDA.care_plan = function (ccda) {
  
  var data = [], el;
  
  var data = {}, el;
      care_plan = ccda.section('care_plan');
      data.entries = [];
      data.displayName = "Care Plan";
      data.templateId = "";
      data.text = care_plan.tag('text').val(true);
  
  care_plan.entries().each(function(entry) {
    
    var name = null,
        code = null,
        code_system = null,
        code_system_name = null;

    // Plan of care encounters, which have no other details
    el = entry.template('2.16.840.1.113883.10.20.22.4.40');
    if (!el.isEmpty()) {
      name = 'encounter';
    } else {
      el = entry.tag('code');
      
      name = el.attr('displayName');
      code = el.attr('code');
      code_system = el.attr('codeSystem');
      code_system_name = el.attr('codeSystemName');
    }

    var text = Core.stripWhitespace(entry.tag('text').val(true));
    var time = entry.tag('effectiveTime').immediateChildTag('center').attr('value');
    
    data.entries.push({
      text: text,
      name: name,
      code: code,
      code_system: code_system,
      code_system_name: code_system_name,
      effective_time: parse(time)
    });
  });
  
  return data;
  
  function parse(str) {
    if (!str) return null;
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : null;
  }
};
