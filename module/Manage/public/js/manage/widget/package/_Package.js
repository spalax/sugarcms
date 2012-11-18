define([
    "dojo/_base/declare"
], function(declare) {
// module:
//      manage/widget/package/_Package
    return declare(null, {
        // summary:
        //      This is a base class for all Packages in manage 
        //      area.
        getRoutes: function() {
            // summary:
            //      Get routes registered the for current packages
            try {
                return []; //Object[]
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});