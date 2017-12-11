/* Parses out basic data about each section */

module.exports = function (ccda, data) {

    var each = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i]);
        }
    };

    var containsTemplateId = function(templateId, data) {
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                var p = data[property].templateId;
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

    allSections.each(function(s) {

        var code = s.tag('code').attr('displayName');
        var templateId =  s.tag('templateId').attr('root');

        var existingTemplateId = containsTemplateId(templateId, data);

        if (code) {
            var nodeName = code.split(' ').join('_').toLowerCase();

            //console.log("NODE NAME " + nodeName);

            if (!data[nodeName] && !existingTemplateId) {
                //console.log("CREATE NODE " + code);
                data[nodeName] = {};
            }

            if(data[nodeName]) {
                data[nodeName].displayName = code;
                data[nodeName].templateId = templateId;
                data[nodeName].text = s.tag('text').val(true);
            }

        }
    });
};