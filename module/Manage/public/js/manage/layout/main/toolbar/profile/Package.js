define(["dojo/_base/declare",
        "../../package",
        "../../route",
        "./dropdown/Container"],
    function(declare, _Package, route, DropDownContainer) {

    var entryRoute = declare([ route.route, route.toolbar.contained ], {

            getRoute: function () {
                // see: route.route::getRoute
                return '/my/profile';
            },

            createObject: function () {
                // see: route.toolbar.contained::createObject
                try {
                    return new DropDownContainer();
                } catch (e) {
                     console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                     throw e;
                }
            },

            handle: function () {
                // see: route.route::handle
                try {
                    this.getInstance().openDropDown();
                } catch (e) {
                     console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                     throw e;
                }
            }
    });

    return declare([ _Package ], {
        // summary:
        //      Profile package. Will provide user abilities to configure
        //      his profile.
        getRoutes: function () {
            try {
                return [ entryRoute ]; //./route[]
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});