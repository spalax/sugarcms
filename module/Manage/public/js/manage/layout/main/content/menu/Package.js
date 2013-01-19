define([
        "dojo/_base/declare",
        "../../package",
        "../../route",
        "./list/Container",
        "./manage/Container"
        ], function(declare, _Package, route, ListContainer, ManageContainer) {

    var menuList = declare([ route.route, route.stack.contained ], {
        routeClass: ListContainer,

        getRoute: function () {
            // see: route.route::getRoute
            return '/menu';
        }
    });

    var menuManage = declare([ route.route, route.stack.contained ], {
        routeClass: ManageContainer,

        getRoute: function () {
            // see: route.stack.contained::getRoute
            return '/menu/manage/:menuId';
        },

        processParams: function (/*Object|undefined*/ params) {
            // see: route.stack.contained::processParams
            try {
                if (!params || !params.menuId) {
                    throw "Could not found menuId in params";
                }
                return params;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });

    return declare([ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.
        getRoutes: function () {
            try {
                return [ menuList,
                         menuManage ]; //String[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});