define([
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "./route"
], function(lang, array, router, route) {
    return function (/*Array*/ routes, /*dijit._Container*/ container) {
        this._assertValidRoute = function (/*route.route!*/ declaredRoute) {
            // summary:
            //      Method for asserting newRoute is valid

            // newDeclaredRoute: route.route Class (not and Object)

            try {
                if (!declaredRoute.prototype) {
                    throw "Could not get prototype of the newRoute in assertValidRoute";
                }

                if (! declaredRoute.prototype.isInstanceOf(route.route)) {
                    throw "Invalid route type must be an instance of ./_base/route";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        };

        this._register = function (/*route.route!*/ declaredRoute) {
            // summary:
            //      Abstract method for registering
            //      newRoute in the router and register handler
            //      for route match.

            // newRoute: [route.route!] Class (not an object)
            try {
                var route = new declaredRoute(container),
                    routePath = route.getRoute();

                router.register(routePath, function (e) {
                    try {
                        console.debug("Loading route >>> ", routePath, e);
                        route.handle(e);
                        console.debug("Route >>>> ", routePath, ' loaded');
                    } catch (e) {
                        console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                        throw e;
                    }
                });

                console.debug("Added route to the router ", routePath,
                    " and obj is  ", route);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        };

        this._registerNewRoute = function (/*route.route!*/ declaredRoute) {
            // summary:
            //      Registering route as new one to the router.
            //      Route must feet required format, if so then
            //      it is will added to the router and when
            //      user will request path from router will
            //      be callback called.
            //

            // newRoute: route.route
            //      Class (not an Object) who contains URL of the route and callback
            //      which will associate URL and init from this unit..
            try {
                this._assertValidRoute(declaredRoute);
                this._register(declaredRoute);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        };

        // summary:
        //      Processing given array of routes types
        try {
            if (!lang.isArray(routes)) {
                throw "Routes must be defined for container";
            }

            if (!container.isInstanceOf || !container.isInstanceOf(require('dijit/_Container'))) {
                throw "Container must be declared and it is must be an instance of" +
                      " dijit/Container";
            }

            array.forEach(routes, lang.hitch(this, '_registerNewRoute'));
        } catch (e) {
            console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
            throw e;
        }
    }
});