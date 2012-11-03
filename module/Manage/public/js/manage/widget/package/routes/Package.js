define([
        "dojo/_base/declare",
        "../_Package"
        ], function(declare, _Package) {
// module:
//      manage/widget/Package
    return declare([ _Package ], {
        // summary:
        //      Routes package. Will provide to user abilities to add routes to the system
        //      and connect routes and html pages.
        getPages: function () {
            try {
                return [ "list/Container", 
                          "add/Container", 
                          "edit/Container" ]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});