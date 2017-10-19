var Core = require('../core');
var AllergiesParser = require('./ccda/allergies');
var CarePlanParser = require('./ccda/care_plan');
var DemographicsParser = require('./ccda/demographics');
var DocumentParser = require('./ccda/document');
var EncountersParser = require('./ccda/encounters');
var FreeTextParser = require('./ccda/free_text');
var FunctionalStatusesParser = require('./ccda/functional_statuses');
var ImmunizationsParser = require('./ccda/immunizations');
var InstructionsParser = require('./ccda/instructions');
var MedicationsParser = require('./ccda/medications');
var ProblemsParser = require('./ccda/problems');
var ProceduresParser = require('./ccda/procedures');
var ResultsParser = require('./ccda/results');
var SmokingStatusParser = require('./ccda/smoking_status');
var VitalsParser = require('./ccda/vitals');

var ParseGenericInfo = require('./generic');

/*
 * Parser for the CCDA document
 */
module.exports = function(doc) {
  var self = this;
  self.doc = doc;
  self.allergiesParser = new AllergiesParser(self.doc);
  self.carePlanParser = new CarePlanParser(self.doc);
  self.demographicsParser = new DemographicsParser(self.doc);
  self.documentParser = new DocumentParser(self.doc);
  self.encountersParser = new EncountersParser(self.doc);
  self.freeTextParser = new FreeTextParser();
  self.functionalStatusesParser = new FunctionalStatusesParser(self.doc);
  self.immunizationsParser = new ImmunizationsParser(self.doc);
  self.instructionsParser = new InstructionsParser();
  self.medicationsParser = new MedicationsParser(self.doc);
  self.problemsParser = new ProblemsParser(self.doc);
  self.proceduresParser = new ProceduresParser(self.doc);
  self.resultsParser = new ResultsParser(self.doc);
  self.smokingStatusParser = new SmokingStatusParser(self.doc);
  self.vitalsParser = new VitalsParser(self.doc);


  self.run = function (ccda) {
    var data = {};
    
    data.document              = self.documentParser.document(ccda);
    data.allergies             = self.allergiesParser.allergies(ccda);
    data.care_plan             = self.carePlanParser.care_plan(ccda);
    data.chief_complaint       = self.freeTextParser.free_text(ccda, 'chief_complaint');
    data.demographics          = self.demographicsParser.demographics(ccda);
    data.encounters            = self.encountersParser.encounters(ccda);
    data.functional_statuses   = self.functionalStatusesParser.functional_statuses(ccda);
    var parsedImmunizations    = self.immunizationsParser.immunizations(ccda);
    data.immunizations         = parsedImmunizations.administered;
    data.immunization_declines = parsedImmunizations.declined;
    data.instructions          = self.instructionsParser.instructions(ccda);
    data.results               = self.resultsParser.results(ccda);
    data.medications           = self.medicationsParser.medications(ccda);
    data.problems              = self.problemsParser.problems(ccda);
    data.procedures            = self.proceduresParser.procedures(ccda);
    data.smoking_status        = self.smokingStatusParser.smoking_status(ccda);
    data.vitals                = self.vitalsParser.vitals(ccda);
    
    data.json                        = Core.json;
    data.document.json               = Core.json;
    data.allergies.json              = Core.json;
    data.care_plan.json              = Core.json;
    data.chief_complaint.json        = Core.json;
    data.demographics.json           = Core.json;
    data.encounters.json             = Core.json;
    data.functional_statuses.json    = Core.json;
    data.immunizations.json          = Core.json;
    data.immunization_declines.json  = Core.json;
    data.instructions.json           = Core.json;
    data.results.json                = Core.json;
    data.medications.json            = Core.json;
    data.problems.json               = Core.json;
    data.procedures.json             = Core.json;
    data.smoking_status.json         = Core.json;
    data.vitals.json                 = Core.json;

    // Decorate each section with Title, templateId and text and adds missing sections
    ParseGenericInfo(ccda, data);

    return data;
  };
}
