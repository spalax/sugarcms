define([
        "dojo/_base/declare",
        "../../package",
        "../../route",
        "./list/Container",
        "./add/Container"
        ], function(declare, _Package, route, ListContainer, AddContainer) {

    var pageList = declare([ route.route, route.stack.contained ], {
        routeClass: ListContainer,
        getRoute: function () {
            // see: route.route::getRoute
            return '/page';
        }
    });

    var pageAdd = declare([ route.route, route.stack.contained ], {
        routeClass: AddContainer,
        getRoute: function () {
            // see: route.route::getRoute
            return '/page/add';
        }
    });

    return declare([ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.
        getRoutes: function () {
            try {
                return [ pageList, pageAdd ]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});