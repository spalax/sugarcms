define([
        "dojo/_base/declare",
        "../_Package",
        "./form/Container"
        ], function(declare, _Package, FormContainer) {
// module:
//      manage/widget/menu/Package
    return declare([ _Package ], {
        // summary:
        //      Login package. Will provide to user abilities to login inside
        //      manage panel.
        getRoutes: function () {
            try {
                return [ {
                          route: '/login',
                          init: function () {
                              return new FormContainer();
                          }
                         } ]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});