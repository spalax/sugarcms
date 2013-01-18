define([
        "dojo/_base/declare",
        "../../_Package",
        "./list/Container",
        "./manage/Container"
        ], function(declare, _Package, ListContainer, ManageContainer) {
    return declare([ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.
        getRoutes: function () {
            try {
                return [ {
                          route: '/menu',
                          init: function () {
                              return new ListContainer();
                          }
                         },
                         {
                          route: '/menu/manage/:menuId',
                          init: function (evt) {
                            try {
                                if (!evt || !evt.params || !evt.params.menuId) {
                                   throw "Could not found id in params";
                                }
                                return new ManageContainer({menuId: evt.params.menuId});
                            } catch (e) {
                                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                throw e;
                            }
                          }} ]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});