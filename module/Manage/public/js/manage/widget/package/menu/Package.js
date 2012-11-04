define([
        "dojo/_base/declare",
        "../_Package"
        ], function(declare, _Package) {
// module:
//      manage/widget/menu/Package
    return declare([ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and html pages.
        getPages: function () {
            try {
                return [ "list/Container" ]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});