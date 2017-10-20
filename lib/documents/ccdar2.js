/*
 * ...
 */

module.exports = function (getEntries) {
    var self = this;
    self.getEntries = getEntries;
    
    self.process = process;
    self.section = section;   

    /*
     * Preprocesses the CCDAR2 document
     */
    function process(ccda) {
        ccda.section = section;
        return ccda;
    };

    /*
     * Finds the section of a CCDA document
     */
    function section(name) {
        var el, entries = self.getEntries();

        switch (name) {
            case 'document':
                return this.template('2.16.840.1.113883.10.20.22.1.15');
            case 'demographics':
                return this.template('2.16.840.1.113883.10.20.22.1.15');
            case 'health_concerns_document':
                el = this.template('2.16.840.1.113883.10.20.22.2.58');
                el.entries = entries;
                return el;
            case 'goals':
                el = this.template('2.16.840.1.113883.10.20.22.2.60');
                el.entries = entries;
                return el;
            case 'interventions':
                el = this.template('2.16.840.1.113883.10.20.21.2.3');
                el.entries = entries;
                return el;
            case 'health_status_outcomes':
                el = this.template('2.16.840.1.113883.10.20.22.2.61');
                el.entries = entries;
                return el;
        }

        return null;
    };
}
