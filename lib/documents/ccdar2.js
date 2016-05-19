/*
 * ...
 */

Documents.CCDAR2 = (function () {

    /*
     * Preprocesses the CCDAR2 document
     */
    var process = function (ccda) {
        ccda.section = section;
        return ccda;
    };


    /*
     * Finds the section of a CCDA document
     */
    var section = function (name) {
        //var el, entries = Documents.entries;

        switch (name) {
            case 'document':
                return this.template('2.16.840.1.113883.10.20.22.1.15');
            case 'demographics':
                return this.template('2.16.840.1.113883.10.20.22.1.15');
        }

        return null;
    };


    return {
        process: process,
        section: section
    };

})();
