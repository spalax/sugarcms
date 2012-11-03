define([
    "dojo/_base/declare"
], function(declare) {
// module:
//      manage/widget/package/_Package
    return declare(null, {
        // summary:
        //      This is a base class for all Packages in manage 
        //      area.
        getPages: function() {
            // summary:
            //      Get pages registered the for current packages
            try {
                return []; //String[]
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});