/* Parses out basic data about each section */

Parsers.GenericInfo = function (ccda, data) {

    var each = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i]);
        }
    };

    var allSections = ccda.elsByTag('section');
    allSections.each = each;

    allSections.each(function(s) {

        var code = s.tag('code').attr('displayName');

        if (code) {
            var nodeName = code.split(' ').join('_').toLowerCase();
            if (!data[nodeName]) {
                data[nodeName] = {};
            }
            data[nodeName].displayName = code;
            data[nodeName].templateId = s.tag('templateId').attr('root');
            data[nodeName].text = s.tag('text').val();
        }
    });
};