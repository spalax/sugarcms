define([
    "dojo/_base/declare",
    "../package"
], function(declare, _Package) {
    return declare([ _Package ], {

        registerRoute: function (/*route.route*/ route) {
            // see: _Package::registerRoute
            try {
                route.register();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});