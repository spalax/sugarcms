define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/Stateful"
], function(_require, declare, array, Stateful) {
    return declare("Base Package", [Stateful], {
        // summary:
        //      This is a base class for all Packages in manage 
        //      area.

        // routes: [protected] Array
        routes: [],

        constructor: function () {
            try {
                this.routes = [];
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        register: function () {
            try {
                console.debug("All available routes in package >>>> ", this.routes);

                var _self = this;
                array.forEach(this.routes, function (newRoute){
                    _self._assertValidRoute(newRoute);
                    _self.registerRoute(newRoute);
                });
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _assertValidRoute: function (/*route.route*/ newRoute) {
            // summary:
            //      Method for asserting newRoute is valid

            // newRoute: route.route Object

            try {
                if (!newRoute.isInstanceOf(_require('./route').route)) {
                    throw "Invalid route type must be an instance of ./_base/route";
                }
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