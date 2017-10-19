/*
 * ...
 */

require('./core.js')
require('./core/codes.js')
require('./core/xml.js')

require('./documents.js')
require('./documents/c32.js')
require('./documents/ccda.js')
require('./documents/ccdar2.js')
require('./documents/ccd.js')

require('./generators.js')
require('./generators/c32.js')
require('./generators/ccda.js')
//require('./ccda_template.ejs')

require('./parsers.js')

require('./parsers/c32.js')
require('./parsers/c32/document.js')
require('./parsers/c32/allergies.js')
require('./parsers/c32/demographics.js')
require('./parsers/c32/encounters.js')
require('./parsers/c32/immunizations.js')
require('./parsers/c32/results.js')
require('./parsers/c32/medications.js')
require('./parsers/c32/problems.js')
require('./parsers/c32/procedures.js')
require('./parsers/c32/vitals.js')

require('./parsers/ccda.js')
require('./parsers/ccda/document.js')
require('./parsers/ccda/allergies.js')
require('./parsers/ccda/care_plan.js')
require('./parsers/ccda/demographics.js')
require('./parsers/ccda/encounters.js')
require('./parsers/ccda/free_text.js')
require('./parsers/ccda/functional_statuses.js')
require('./parsers/ccda/immunizations.js')
require('./parsers/ccda/instructions.js')
require('./parsers/ccda/results.js')
require('./parsers/ccda/medications.js')
require('./parsers/ccda/problems.js')
require('./parsers/ccda/procedures.js')
require('./parsers/ccda/smoking_status.js')
require('./parsers/ccda/vitals.js')
require('./parsers/generic.js')
require('./parsers/ccdar2.js')
require('./parsers/ccdar2/document.js')
require('./parsers/ccdar2/health_concerns.js')
require('./parsers/ccd.js')
require('./parsers/ccd/document.js')

require('./renderers.js')
//require('./renderers/c32.js')
//require('./renderers/ccda.js')


/* exported BlueButton */
module.exports.BlueButton = function (source, opts) {
  var type, parsedData, parsedDocument;
  
  // Look for options
  if (!opts) opts = {};
  
  // Detect and parse the source data
  parsedData = Core.parseData(source);
  
  // Detect and parse the document
  if (opts.parser) {
    
    // TODO: parse the document with provided custom parser
    parsedDocument = opts.parser();
    
  } else {
    type = Documents.detect(parsedData);
    switch (type) {
      case 'c32':
        parsedData = Documents.C32.process(parsedData);
        parsedDocument = Parsers.C32.run(parsedData);
        break;
      case 'ccda':
        parsedData = Documents.CCDA.process(parsedData);
        parsedDocument = Parsers.CCDA.run(parsedData);
        break;
      case 'ccdar2':
        parsedData = Documents.CCDAR2.process(parsedData);
        parsedDocument = Parsers.CCDAR2.run(parsedData);
        break;
      case 'ccd':
        parsedData = Documents.CCD.process(parsedData);
        parsedDocument = Parsers.CCD.run(parsedData);
        break;
      case 'json':
        /* Expects a call like:
         * BlueButton(json string, {
         *   generatorType: 'ccda',
         *   template: < EJS file contents >
         * })
         * The returned "type" will be the requested type (not "json")
         * and the XML will be turned as a string in the 'data' key
         */
        switch (opts.generatorType) {
          // only the unit tests ever need to worry about this testingMode argument
          case 'c32':
            type = 'c32';
            parsedDocument = Generators.C32.run(parsedData, opts.template, opts.testingMode);
            break;
          case 'ccda':
            type = 'ccda';
            parsedDocument = Generators.CCDA.run(parsedData, opts.template, opts.testingMode);
            break;
        }
    }
  }
  
  return {
    type: type,
    data: parsedDocument,
    source: parsedData
  };

};
