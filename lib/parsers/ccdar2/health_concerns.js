/*
 * Parser for the CCDAR2 Health Concerns Section
 * 2.16.840.1.113883.10.20.22.2.58
 */

Parsers.CCDA.problems = function (ccda) {
    var parseDate = Documents.parseDate;
    var parseName = Documents.parseName;
    var parseAddress = Documents.parseAddress;

    var model = {};
    model.entries = [], el;;

    model.text = ccda.tag('text').attr('value');

    console.log("TEXT VALUE");
    console.log(model.text);

    return model;
};
