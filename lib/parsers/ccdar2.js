/*
 * Parser for the CCDAR2 document
 */

var ParseGenericInfo = require('./generic');
var Core = require('../core');

var DocumentParser = require('./ccdar2/document');
var DemographicsParser = require('./ccda/demographics');
var HealthConcernsParser = require('./ccdar2/health_concerns');

module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  self.documentParser = new DocumentParser(self.doc);
  self.demographicsParser = new DemographicsParser(self.doc);
  self.healthConcernsParser = new HealthConcernsParser(self.doc);

  self.run = function (ccda) {    
      var data = {};
  
      data.document              = self.documentParser.document(ccda);
      data.demographics          = self.demographicsParser.demographics(ccda);
      data.health_concerns_document  = self.healthConcernsParser.health_concerns_document(ccda);
      data.json                  = Core.json;
  
      // Decorate each section with Title, templateId and text and adds missing sections
      ParseGenericInfo(ccda, data);
  
      return data;
    };
}
