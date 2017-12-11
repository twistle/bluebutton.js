/*
 * Parser for the CCDAR2 document section
 */
var Core = require('../../core');


module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  self.document = document;

  function document(ccda) {
    
      var parseDate = self.doc.parseDate;
      var parseName = self.doc.parseName;
      var parseAddress = self.doc.parseAddress;
      var data = {}, el;
    
      var doc = ccda.section('document');
      var date = parseDate(doc.tag('effectiveTime').attr('value'));
      var title = Core.stripWhitespace(doc.tag('title').val());
    
      // Parse Doc Type Info
      var templates =  doc.elsByTag('templateId');
      
      var rootTemplate = templates[0].attr('root');
      var secondTemplate;
      if(templates.length >1)
        secondTemplate = templates[1].attr('root');
      else
        secondTemplate = rootTemplate;
    
      var loinc = doc.tag('code').attr('code');
      var templateId = doc.tag('templateId').attr('root');
      var displayName = doc.tag('code').attr('displayName');
    
      var nonXml = doc.tag('nonXMLBody');
      var nonXmlNodes = nonXml.el.childNodes;
    
      var bodyType = "structured";
      var nonXmlBody = {
        type: "",
        mediaType: "",
        representation: "",
        rawText: "",
        reference: ""
      };
      if(nonXmlNodes && nonXmlNodes.length > 0) {
        bodyType = "unstructured";
        var text = nonXml.tag('text');
        var mediaType = "";
        var representation = "";
        var rawText = "";
        var reference = "";
        var type = "";
    
        // We have an embedded doc
        if(text && text.attr('mediaType')) {
          mediaType = text.attr('mediaType');
          representation = text.attr('representation');
          rawText = text.val();
          type = "embedded";
        }
    
        if(text && !mediaType) {
          reference = text.tag('reference').attr('value');
          type = "reference";
        }
        nonXmlBody = {
          type: type,
          mediaType: mediaType,
          representation: representation,
          rawText: rawText,
          reference: reference
        }
      }
    
      var docType = {
        type: "CCDAR2",
        rootTemplateId: rootTemplate,
        templateId: secondTemplate,
        displayName: displayName,
        loinc: loinc,
        bodyType: bodyType,
        nonXmlBody: nonXmlBody
      };
    
      var author = doc.tag('author');
      el = author.tag('assignedPerson').tag('name');
      var name_dict = parseName(el);
    
      el = author.tag('addr');
      var address_dict = parseAddress(el);
    
      el = author.tag('telecom');
      var work_phone = el.attr('value');
    
      var documentation_of_list = [];
      var performers = doc.tag('documentationOf').elsByTag('performer');
      for (var i = 0; i < performers.length; i++) {
        el = performers[i];
        var performer_name_dict = parseName(el);
        var performer_phone = el.tag('telecom').attr('value');
        var performer_addr = parseAddress(el.tag('addr'));
        documentation_of_list.push({
          name: performer_name_dict,
          phone: {
            work: performer_phone
          },
          address: performer_addr
        });
      }
    
      el = doc.tag('encompassingEncounter').tag('location');
      var location_name = Core.stripWhitespace(el.tag('name').val());
      var location_addr_dict = parseAddress(el.tag('addr'));
    
      var encounter_date = null;
      el = el.tag('effectiveTime');
      if (!el.isEmpty()) {
        encounter_date = parseDate(el.attr('value'));
      }
    
      data = {
        type: docType,
        date: date,
        title: title,
        author: {
          name: name_dict,
          address: address_dict,
          phone: {
            work: work_phone
          }
        },
        documentation_of: documentation_of_list,
        location: {
          name: location_name,
          address: location_addr_dict,
          encounter_date: encounter_date
        }
      };
    
      return data;
    };
}