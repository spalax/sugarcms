define([
        "dojo/_base/declare",
        "../../_Package",
        "./list/Container",
        "./add/Container"
        ], function(declare, _Package, ListContainer, AddContainer) {

    return declare([ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.
        getRoutes: function () {
            try {
                return [ {
                          route: '/page',
                          init: function () {
                              return new ListContainer();
                          }
                         },
                          {
                           route: '/page/add', 
                           init: function (evt) {
                             try {
                                 return new AddContainer();
                             } catch (e) {
                                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                 throw e;
                             }
                           }}]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});