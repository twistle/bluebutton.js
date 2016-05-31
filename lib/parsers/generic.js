/* Parses out basic data about each section */

Parsers.GenericInfo = function (ccda, data) {

    var each = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i]);
        }
    };

    var containsTemplateId = function(templateId) {
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                var p = this[property].templateId;
                //var display = this[property].displayName;
                if(p) {
                    if(p === templateId) {
                        //console.log("TemplateId Match " + templateId + " " + display);
                        return true;
                    }
                }
            }
        }
        return false;
    };

    var allSections = ccda.elsByTag('section');
    allSections.each = each;

    data.containsTemplateId = containsTemplateId;

    allSections.each(function(s) {

        var code = s.tag('code').attr('displayName');
        var templateId =  s.tag('templateId').attr('root');

        var existingTemplateId = data.containsTemplateId(templateId);

        if (code) {
            var nodeName = code.split(' ').join('_').toLowerCase();

            if (!data[nodeName] && !existingTemplateId) {
                data[nodeName] = {};
            }
            data[nodeName].displayName = code;
            data[nodeName].templateId = templateId;
            data[nodeName].text = s.tag('text').val(true);
        }
    });
};