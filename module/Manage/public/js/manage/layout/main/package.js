define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/array",
    "./route",
    "dojo/Stateful"
], function(_require, declare, array, route, Stateful) {
    return declare("Base Package", [Stateful], {
        // summary:
        //      This is a base class for all Packages in manage 
        //      area.

        // _routes: [private] Array
        _routes: [],

        // routeParams: [protected] Array
        routeParams: [],

        constructor: function () {
            try {
                this._routes = this.routeParams = [];
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        postscript: function () {
            try {
                this.inherited(arguments);
                var _self = this;

                array.forEach(this.get('routeParams'), function (routeParams){
                    var routeObject = _self.extractRoute(routeParams);
                    _self.addRoute(routeObject);
                });
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        extractRoute: function (/*Object*/ routeParams) {
            // summary:
            //      Factory abstract method, created
            //      for provide abilities to overload
            //      in children.
            // returns:
            //      route object
            // tags:
            //      protected

            throw new TypeError("abstract");
        },

        register: function () {
            try {
                console.debug("All available routes in package >>>> ", this._routes);
                array.forEach(this._routes, _require('dojo/_base/lang').hitch(this, 'registerRoute'));
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        addRoute: function (/*route*/ newRoute) {
            try {
                if (!newRoute.isInstanceOf(route)) {
                    throw new TypeError("newRoute has undefined or incompatible type");
                }
                this._routes.push(newRoute);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        registerRoute: function (/*route.route*/ newRoute) {
            // summary:
            //      Method for registering
            //      newRoute in the router and register handler
            //      for route match.
            // tags:
            //      protected

            // route: [route.route] Object
            try {
                throw new TypeError("abstract");
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});