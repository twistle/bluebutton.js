/*
 * Parser for the CCDAR2 Health Concerns Section
 * 2.16.840.1.113883.10.20.22.2.58
 */

module.exports = function(doc) {
    var self = this;
    self.doc = doc;

    self.health_concerns_document = function (ccda) {
        var parseDate = self.doc.parseDate;
        var parseName = self.doc.parseName;
        var parseAddress = self.doc.parseAddress;
    
        // Helper to create each iterator for collection
        var each = function (callback) {
            for (var i = 0; i < this.length; i++) {
                callback(this[i]);
            }
        };
    
        var model = {}, el;
        model.entries = [];
    
        model.text = ccda.tag('text').val(true);
    
        var health_concerns = ccda.section('health_concerns_document');
        var title = health_concerns.tag('title').val();
    
        health_concerns.entries().each(function(entry) {
    
            var entryModel = {};
            // Parse out the ACT Body
            //A record of something that is being done, has been done, can be done, or is intended or requested to be done.
            var act = entry.tag('act');
            var er = act.elsByTag('entryRelationship');
            var templateId = act.tag('templateId').attr('root');
            var id = act.tag('id').attr('root');
            var statusCode = act.tag('statusCode').attr('code');
            var code = act.tag('code');
            var name = code.attr('displayName');
            var effectiveTime = parseDate(entry.tag('effectiveTime'));
    
            // The model we want to return in json
            var actModel = {
                effective_time: effectiveTime,
                name: name,
                entry_relationship:[]
            };
    
            // Parse Entity Relationship child nodes
    
            var ers = entry.elsByTag('entryRelationship');
            ers.each = each;
    
            ers.each(function(er){
    
                var erModel = {
                    type_code : er.attr('typeCode'),
                    observations : []
                };
    
                var obs = er.elsByTag('observation');
                obs.each = each;
    
                // Parse out Obsevations for Each ER
                obs.each(function(ob) {
                    erModel.observations.push({
                        class_code: ob.attr('classCode'),
                        mood_code: ob.attr('moodCode'),
                        display_name : ob.tag('value').attr('displayName'),
                        status: ob.tag('statusCode').attr('code')
                    });
                });
    
                actModel.entry_relationship.push(erModel);
    
            });
    
            // Add ACT Model to our final return model
            entryModel['act'] = actModel;
            model.entries.push(entryModel);
        });
    
        return model;
    };    
}