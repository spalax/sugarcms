define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "../route",
    "../package"
], function(declare, lang, route, _Package) {
    return declare([ _Package ], {

        extractRoute: function (/*Object*/ routeParams) {
            // see: _Package::extractRoute
            try {
                var routeObject = new route(routeParams);
                routeObject.on('handle', lang.hitch(this, 'handle', routeObject));
                return routeObject;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        registerRoute: function (/*route*/ route) {
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